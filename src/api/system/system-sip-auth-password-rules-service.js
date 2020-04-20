import { api } from '..'

export function show() {
  return api.get('/system/sip-authentication-password-rules')
}
export default { show }


