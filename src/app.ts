import express from 'express';
import 'express-async-errors';
import carRouter from './routes/car';
import motorcycleRouter from './routes/motorcycle';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(errorMiddleware);

export default app;
