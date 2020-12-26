import { IChat } from '../../repository/db-models/chat-repo-model';
import { chatRepository } from '../../repository/chat-repository';
import { userRepository } from '../../repository/user.repository';

async function addChatMsg(roomId: string, id: string, message: string): Promise<IChat> {
  const chatMsg = {} as IChat;
  const loggedUser = await userRepository.getUserById(id);
  chatMsg.userId = loggedUser._id;
  chatMsg.pseudo = loggedUser.pseudo;
  chatMsg.message = message;
  chatMsg.dateTime = new Date().toLocaleString();
  return chatRepository.addChatMsg(chatMsg);
}

const chatService = {
  addChatMsg
};
export {chatService};
