import zlib from 'zlib';
import { Request, Response, NextFunction } from 'express';
import hash from 'object-hash';
import { redisClient } from '../utils/redisClient.util.js';
import logger from '../utils/logger.util.js';

interface RedisCacheMiddlewareOptions {
  EX?: number; // the specified expire time in seconds
  PX?: number; // the specified expire time in milliseconds
  EXAT?: number; // the specified Unix time at which the key will expire, in seconds
  PXAT?: number; // the specified Unix time at which the key will expire, in milliseconds
  NX?: boolean; // write the data only if the key does not already exist
  XX?: boolean; // write the data only if the key already exists
  KEEPTTL?: boolean; // retain the TTL associated with the key
  GET?: boolean; // return the old string stored at key, or "undefined" if key did not exist
}
function requestToKey(req: Request): string {
  const reqDataToHash = {
    params: req.params,
    body: req.body,
  };

  return `${req.path}@${hash.sha1(reqDataToHash)}`;
}

function isRedisWorking(): boolean {
  return !!redisClient?.isOpen;
}

async function writeData(
  key: string,
  data: any,
  options: RedisCacheMiddlewareOptions,
  compress: boolean = true,
): Promise<void> {
  if (isRedisWorking() && redisClient) {
    let dataToCache = data;
    if (compress) {
      dataToCache = zlib.deflateSync(data).toString('base64');
    }

    try {
      await redisClient.set(key, dataToCache, options as any);
    } catch (e) {
      logger.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

async function readData(key: string, compressed: boolean = true): Promise<string | undefined> {
  if (isRedisWorking() && redisClient) {
    try {
      const cachedValue = await redisClient.get(key);
      if (cachedValue) {
        if (compressed) {
          return zlib.inflateSync(Buffer.from(cachedValue, 'base64')).toString();
        } else {
          return cachedValue;
        }
      }
    } catch (e) {
      logger.error(`Failed to read cached data for key=${key}`, e);
      return undefined;
    }
  }

  return undefined;
}

function redisCacheMiddleware(options: RedisCacheMiddlewareOptions = { EX: 21600 }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (isRedisWorking()) {
      const key = requestToKey(req);
      const cachedValue = await readData(key);

      if (cachedValue) {
        try {
          res.json(JSON.parse(cachedValue));
        } catch {
          res.send(cachedValue);
        }
      } else {
        const oldSend = res.send.bind(res);
        res.send = (data: any) => {
          (async () => {
            if (res.statusCode.toString().startsWith('2')) {
              await writeData(key, data, options);
            }
          })();
          return oldSend(data);
        };

        next();
      }
    } else {
      next();
    }
  };
}

async function redisFlush(req: Request, res: Response, next: NextFunction) {
  try {
    if (isRedisWorking() && redisClient) {
      const result = await redisClient.flushDb();
      console.log(result); // Will log 'OK' if successful
    }
  } catch (err) {
    console.error('Error flushing Redis DB:', err);
  } finally {
    next();
  }
}

export { redisCacheMiddleware, writeData, readData, requestToKey, isRedisWorking, redisFlush };
