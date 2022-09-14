import express from 'express';
import 'express-async-errors';
import carRouter from './routes/car';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(errorMiddleware);

export default app;
