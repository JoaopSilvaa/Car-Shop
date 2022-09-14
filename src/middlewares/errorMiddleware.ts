import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, Errors } from '../errors/errors';

const errorMiddleware: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof Errors;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { error, httpStatus } = mappedError;
    
    return res.status(httpStatus).json({ error });
  }

  return res.status(500).json({ message: 'Ops! Internal Error' });
};

export default errorMiddleware;
