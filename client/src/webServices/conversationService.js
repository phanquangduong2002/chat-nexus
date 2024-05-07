import api from '../configs/endpoints'
import connectServer from '../configs/connectServer'

export const getConversations = async dataPost => {
  return connectServer[api.GET_CONVERSATIONS_API.method](api.GET_CONVERSATIONS_API.url)
}

export const changeUserRole = async dataPost => {
  return connectServer[api.CHANGE_USER_ROLE_API.method](api.CHANGE_USER_ROLE_API.url, dataPost)
}

export const blockUser = async dataPost => {
  return connectServer[api.BLOCK_USER_API.method](api.BLOCK_USER_API.url, dataPost)
}

export default { getConversations, changeUserRole, blockUser }
