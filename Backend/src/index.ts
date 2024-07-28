// Deps Import
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import cors from 'cors';
import cronJob from 'node-cron';

// Routes Import
import userRoutes from './routes/User.routes.js';
import petRoutes from './routes/Pets.routes.js';
import productRoutes from './routes/Product.routes.js';
import cartRoutes from './routes/Cart.routes.js';
import blogRoutes from './routes/Blog.routes.js';
import paymentRoutes from './routes/Payment.routes.js';
import adminRoutes from './routes/Admin.routes.js';

// Middlewares import
import sendRequestToServer from './cronJob/index.js';
import morganMiddleware from './middlewares/morgan.middleware.js';
import logger from './utils/logger.util.js';

const app: Express = express();

// Incoming Request Body Limit
app.use(express.json({ limit: '18kb' }));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const CORS_ORIGIN: string | undefined = process.env.CORS_ORIGIN || '*';

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  }),
);

// Handle preflight requests
app.options('*', cors());

app.use(morganMiddleware);

// Define Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/admin', adminRoutes);

// Health Verifying Route
app.get('/api/v1/health', (_, res) => {
  logger.info('Server is Running');
  res.send('Server is Running');
});

// Cron Job for Zero Down Time in free Render Instance
export const job = cronJob.schedule('30 * * * *', () => sendRequestToServer());

export default app;
