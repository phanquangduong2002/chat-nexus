import api from '../configs/endpoints'
import connectServer, { get } from '../configs/connectServer'

export const getMessageByUser = async dataPost => {
  const { id } = dataPost
  return connectServer[api.GET_MESSAGE_BY_USER_API.method](api.GET_MESSAGE_BY_USER_API.url + '/' + id)
}

export const getMessageByGroup = async dataPost => {
  const { id } = dataPost
  return connectServer[api.GET_MESSAGE_BY_GROUP_API.method](api.GET_MESSAGE_BY_GROUP_API.url + '/' + id)
}

export const createMessage = async dataPost => {
  return connectServer[api.CREATE_MESSAGE_API.method](api.CREATE_MESSAGE_API.url, dataPost)
}

export default { getMessageByUser, getMessageByGroup, createMessage }
