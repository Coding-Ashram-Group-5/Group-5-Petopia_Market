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
import sendRequestToServer from './cronJob/index.js';

const app: Express = express();

// Incoming Request Body Limit
app.use(express.json({ limit: '18kb' }));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const CORS_ORIGIN: string | undefined = process.env.CORS_ORIGIN || '*';

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/blogs', blogRoutes);

// Health Verifying Route
app.get('/api/v1/health', (_, res) => {
  res.send('Server is Runnning');
});

// Cron Job for Zero Down Time in free Render Instance
export const job = cronJob.schedule('* 13 * * *', () => sendRequestToServer());

export default app;
