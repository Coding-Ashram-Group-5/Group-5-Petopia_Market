import crypto from 'crypto';
const randomString = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export default randomString;
