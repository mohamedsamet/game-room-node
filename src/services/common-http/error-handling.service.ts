import { ErrorResponse } from '../../models/error-status.model';
import { ERROR_RESPONSE } from '../../constants/error-status.constant';

function getResponse(res: any, erreur: Error): Response {
  const errorResponse: ErrorResponse = ERROR_RESPONSE.find(err => err.status.toString() === erreur.message);
  if (errorResponse) {
    return res.status(errorResponse.status).send(errorResponse.message);
  }
  const badRequestResponse: ErrorResponse = ERROR_RESPONSE.find(err => err.status === 400);
  return res.status(400).send(badRequestResponse.message);
}

const errorHandlingService = {getResponse};
export {errorHandlingService};
