import { api } from '.'

function token(username, password) {
  return api.post('auth/token', { username, password })
}

function password(userId, oldPassword, newPassword) {
  const json = { userId, newPassword }
  if (oldPassword) {
    json.oldPassword = oldPassword
  }
  return api.put('auth/password')
}

function session() {
  return api.get('auth/session')
}

export default { token, password, session }
