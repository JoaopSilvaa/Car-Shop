export enum Errors {
  InvalidId = 'InvalidId',
  ObjectNotFound = 'ObjectNotFound',
}

type ErrorResponse = {
  error: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in Errors]: ErrorResponse
};

export const errorCatalog: ErrorCatalog = {
  InvalidId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  ObjectNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
};
