import { ErrorResponse } from '../models/error-status.model';

export const ERROR_RESPONSE: ErrorResponse[] = [
  {
    status: 400,
    message: 'Bad Request'
  },
  {
    status: 409,
    message: 'Conflict'
  },
  {
    status: 403,
    message: 'Inauthorized'
  }
]
