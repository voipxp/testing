import { api } from '..'

export const options = {
  recallNumberOfRings: {
    minimum: 2,
    maximim: 20
  },
  busyCampOnSeconds: {
    minimum: 30,
    maximim: 600
  }
}

export function show(userId) {
  return api.get('/users/call-transfer', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-transfer', params)
}

export default { show, update, options }


