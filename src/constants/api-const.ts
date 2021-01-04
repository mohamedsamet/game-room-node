export const USER_URL = '/users';
export const ROOM_URL = '/rooms';
export const CHAT_URL = '/chat';
export const VERSION_URL = '/version';
export const ROOM_ACCESS_URL = '/rooms/access';
export const EXPRESS_API_PORT = process.env.NODE_ENV === 'dev' ? 3000 : 3005;
export const SOCKET_API_PORT = process.env.NODE_ENV === 'dev' ? 3002 : 3007;

