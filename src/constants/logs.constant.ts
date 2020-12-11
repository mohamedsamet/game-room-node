const HTTP_LOG = '[http] ';
const SOCKET_LOG = '[ws] ';
export const ADD_NEW_ROOM_LOG = HTTP_LOG + 'add new room';
export const ADD_USER_TO_ROOM_LOG = HTTP_LOG + 'add user to room';
export const REMOVE_USER_FROM_ROOM_LOG = HTTP_LOG + 'remove user from room';
export const GET_ROOMS_BY_PAGE_LOG = HTTP_LOG + 'get rooms list by page';
export const DELETE_ROOM_BY_ID = HTTP_LOG + 'delete room by id';
export const GET_LOGGED_USER_LOG = HTTP_LOG + 'logged user sent';
export const DISCONNECT_USER_LOG = HTTP_LOG + 'user disconnected';
export const ADD_NEW_USER_LOG = HTTP_LOG + 'add new user';
export const GET_ROOMS_SOCKET_LOG = SOCKET_LOG + 'updated rooms list emitted';
