import { ErrorResponse } from '../../models/error-status.model';
import { ERROR_RESPONSE } from '../../constants/error-status.constant';
import { BAD_REQUEST_CODE } from '../../constants/errors-code.constant';

function getResponse(res: any, erreur: Error): Response {
  const errorResponse: ErrorResponse = ERROR_RESPONSE.find(err => err.status === erreur.message);
  if (errorResponse) {
    return res.status(+errorResponse.status).send(errorResponse.message);
  }
  const badRequestResponse: ErrorResponse = ERROR_RESPONSE.find(err => err.status === BAD_REQUEST_CODE);
  return res.status(+BAD_REQUEST_CODE).send(badRequestResponse.message);
}

const errorHandlingService = {getResponse};
export {errorHandlingService};
