export default {
  // user
  REGISTER_USER_API: {
    method: 'post',
    url: '/auth/register'
  },
  LOGIN_USER_API: {
    method: 'post',
    url: '/auth/login'
  },

  REFRESH_TOKEN_API: {
    method: 'post',
    url: '/auth/refresh'
  },

  CHECK_TOKEN_EXPIRATION_API: {
    method: 'get',
    url: '/auth/check-token-expiration'
  },

  // conversations
  GET_CONVERSATIONS_API: {
    method: 'get',
    url: '/conversation'
  }
}
