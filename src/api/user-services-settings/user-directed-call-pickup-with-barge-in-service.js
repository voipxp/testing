import { api } from '..'

const url = '/users/directed-call-pickup-with-barge-in'

export function show(userId) {
  return api.get(url, { params: { userId } })
}

export function update(params) {
  return api.put(url, params)
}

/**
The response json gor get and param for update is a json of the format:
{enableBargeInWarningTone:true/false,enableAutomaticTargetSelection:true/false, userId: <valueOfUserId>, }
*/

export default { show, update }