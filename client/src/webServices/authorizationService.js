import api from '../configs/endpoints'
import connectServer from '../configs/connectServer'

export const registerUser = dataPost => {
  return connectServer[api.REGISTER_USER_API.method](api.REGISTER_USER_API.url, dataPost)
}

export const loginUser = dataPost => {
  return connectServer[api.LOGIN_USER_API.method](api.LOGIN_USER_API.url, dataPost)
}

export const refreshToken = dataPost => {
  return connectServer[api.REFRESH_TOKEN_API.method](api.REFRESH_TOKEN_API.url, dataPost)
}

export const checkTokenExpiration = dataPost => {
  return connectServer[api.CHECK_TOKEN_EXPIRATION_API.method](api.CHECK_TOKEN_EXPIRATION_API.url)
}
export default { registerUser, loginUser, refreshToken, checkTokenExpiration }
