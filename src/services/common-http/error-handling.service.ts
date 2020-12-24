import { ErrorResponse } from '../../models/error-status.model';
import { ERROR_RESPONSE } from '../../constants/error-status.constant';
import { BAD_REQUEST_CODE, CONFLICT_CODE, DB_CONFLICT } from '../../constants/errors-code.constant';

function getResponse(res: any, erreur: Error): Response {
  const errorResponse: ErrorResponse = ERROR_RESPONSE.find(err => err.status === erreur.message);
  if (errorResponse) {
    return res.status(+errorResponse.status).send(errorResponse.message);
  }
  const badRequestResponse: ErrorResponse = ERROR_RESPONSE.find(err => err.status === BAD_REQUEST_CODE);
  return res.status(+BAD_REQUEST_CODE).send(badRequestResponse.message);
}

function getDbErrorResponse(res: any, err: any): Response {
  let status = BAD_REQUEST_CODE;
  if (err.includes(DB_CONFLICT)) {
    status = CONFLICT_CODE;
  }
  return res.status(+status).send(err);
}

const errorHandlingService = {getResponse, getDbErrorResponse};
export {errorHandlingService};
