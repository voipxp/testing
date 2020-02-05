import { api } from '..'

export const options = {
  recallNumberOfRings: {
    minimum: 2,
    maximum: 20
  },
  busyCampOnSeconds: {
    minimum: 30,
    maximum: 600
  }
}

export function show(userId) {
  return api.get('/users/call-transfer', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isRecallActive:true/false,recallNumberOfRings:4,enableBusyCampOn:true/false,
,busyCampOnSeconds:120,useDiversionInhibitorForBlindTransfer:true/false,useDiversionInhibitorForConsultativeCalls:true/false,  userId: <valueOfUserId> }

*/
	
export function update(params) {
  return api.put('/users/call-transfer', params)
}

export default { show, update, options }


