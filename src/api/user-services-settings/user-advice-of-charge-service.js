import { api } from '..'

const url  =  '/users/advice-of-charge'

const options = {
  aocTypes:[
    { key: 'During Call', name: 'During Call' },
    { key: 'End Of Call', name: 'End Of Call' }
  ]
}

export function show(userId) {
  return api.get(url, { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,aocTypes: During Call/End Of Call, userId: <valueOfUserId>, }

*/

export function update(params) {
  return api.put(url, params)
}

export default { show, update , options }
