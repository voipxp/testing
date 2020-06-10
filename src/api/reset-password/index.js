import { api } from '..'

export const sendResetPasswordLink = (obj) => {
  return api.post('self-service/send-reset-password-link', obj)
}

export const resetPasswordFromLink = (obj) => {
  return api.post('self-service/reset-password-from-link', obj)
}

export const validateToken = (obj) => {
  return api.post('self-service/validate-token', obj)
}

export default { sendResetPasswordLink, resetPasswordFromLink, validateToken }
