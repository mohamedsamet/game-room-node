import ChatRepoModel, { IChat } from './db-models/chat-repo.model';

async function addChatMsg(chatMsg: IChat): Promise<IChat> {
    const chatToSave: IChat = getChatRepModel(chatMsg);
    return await chatToSave.save()
      .then(res => res)
      .catch((e) => {throw e.message});
}

async function getChatMessagesByRoomId(roomId: string): Promise<IChat[]> {
    return await ChatRepoModel.find({roomId})
      .sort({field: 'asc', _id: -1})
      .then(res => res)
      .catch((e) => {throw e.message});
}

function getChatRepModel(chatDto: IChat): IChat {
  return new ChatRepoModel({
    roomId: chatDto.roomId,
    pseudo: chatDto.pseudo,
    userId: chatDto.userId,
    message: chatDto.message,
    dateTime: chatDto.dateTime
  });
}

const chatRepository = {addChatMsg, getChatMessagesByRoomId};

export {chatRepository};
