import { ErrorResponse } from '../models/error-status.model';
import { BAD_REQUEST_CODE, CONFLICT_CODE, INAUTHORIZED_CODE, NOT_FOUND_CODE } from './errors-code.constant';

export const ERROR_RESPONSE: ErrorResponse[] = [
  {
    status: BAD_REQUEST_CODE,
    message: 'Bad Request'
  },
  {
    status: CONFLICT_CODE,
    message: 'Conflict'
  },
  {
    status: INAUTHORIZED_CODE,
    message: 'Inauthorized'
  },
  {
    status: NOT_FOUND_CODE,
    message: 'Not found'
  }
];
