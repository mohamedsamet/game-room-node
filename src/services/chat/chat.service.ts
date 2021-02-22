import {IChat, IChatResult, IChatWeb} from '../../repository/db-models/chat-repo.model';
import { chatRepository } from '../../repository/chat.repository';
import { userRepository } from '../../repository/user.repository';

async function addChatMsg(roomId: string, id: string, message: string): Promise<IChat> {
  const chatMsg = {} as IChat;
  const loggedUser = await userRepository.getUserById(id);
  chatMsg.userId = loggedUser._id;
  chatMsg.pseudo = loggedUser.pseudo;
  chatMsg.message = message;
  chatMsg.roomId = roomId;
  chatMsg.dateTime = new Date();
  return chatRepository.addChatMsg(chatMsg);
}

async function getPaginatedMessages(roomId: string, start: number, end: number): Promise<IChatResult> {
  const chatResult = {} as IChatResult;
  const chatMessages: IChat[] = await chatRepository.getChatMessagesByRoomId(roomId, start, end);
  chatResult.messages = parseChatMessagesDates(chatMessages);
  chatResult.total = await chatRepository.getTotalMessages();
  return chatResult;
}

function parseChatMessagesDates(chatMessages: IChat[]): IChatWeb[] {
  return chatMessages.map(chat => mapToChatWeb(chat))
}

function mapToChatWeb(chat: IChat): IChatWeb {
  const chatMsgWeb = {} as IChatWeb;
  chatMsgWeb.dateTimeParsed = mapToChatParsedDate(chat.dateTime);
  chatMsgWeb.userId = chat.userId;
  chatMsgWeb.message = chat.message;
  chatMsgWeb.pseudo = chat.pseudo;
  return chatMsgWeb;
}


function mapToChatParsedDate(chatDate: Date): string {
  const chatDateTime = new Date(chatDate);
  if (chatDateTime.toDateString() === new Date().toDateString()) {
    return `${padTime(chatDateTime.getHours())}:${padTime(chatDateTime.getMinutes())}`;
  }
  return chatDateTime.toLocaleString();
}

function padTime(time: number): string {
  return time < 10 ? `0${time}` : time.toString();
}

const chatService = {
  addChatMsg, getPaginatedMessages, parseChatMessagesDates
};
export {chatService};
