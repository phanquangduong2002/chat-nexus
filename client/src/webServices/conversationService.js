import api from '../configs/endpoints'
import connectServer from '../configs/connectServer'

export const getConversations = async dataPost => {
  return connectServer[api.GET_CONVERSATIONS_API.method](api.GET_CONVERSATIONS_API.url)
}

export default { getConversations }
