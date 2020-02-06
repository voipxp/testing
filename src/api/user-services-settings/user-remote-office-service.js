import { api } from '..'

export const options = {
  remoteOfficePhoneNumber: {
    minimum: 2,
    maximum: 30
  }
}

export function show(userId) {
  return api.get('/users/remote-office', { params: { userId } })
}

export function update(params) {
  return api.put('/users/remote-office', params)
}

export default { show, update }

 


