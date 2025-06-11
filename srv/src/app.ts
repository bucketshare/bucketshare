import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import Email from './routes/email';

const app = express();

app.use(express.json());
app.use('/', Email);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;