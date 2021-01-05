export const MONGO_DB = '/local';
export const MONGO_PORT = process.env.NODE_ENV === 'dev' ? 27018 : 27019;
const MONGO_SERVICE_NAME = process.env.NODE_ENV === 'dev' ? 'mongo' : 'mongo-prod';
export const MONGO_BASE_URL = `mongodb://${MONGO_SERVICE_NAME}:`;
export const MONGO_CONNECTION_OPTIONS = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true};
export const USERS_COLLECTION = 'users';
export const CHAT_COLLECTION = 'chat';
export const ROOMS_COLLECTION = 'rooms';
