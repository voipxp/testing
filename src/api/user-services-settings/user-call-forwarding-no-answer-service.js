import { api } from '..'

export const options = {
  forwardToPhoneNumber: {
    minimum: 1,
    maximum: 161
  },
  numberOfRings: {
    minimum: 2,
    maximum: 20
  }
}

export function show(userId) {
  return api.get('/users/call-forwarding-no-answer', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-forwarding-no-answer', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}

export default { show, update, bulk, options }



