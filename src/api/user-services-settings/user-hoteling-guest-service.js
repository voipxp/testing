import { api } from '..'

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId: serviceProviderId, groupId: groupId } })
}

export const  options = {
  userAccessLevelType: [
    { key:'Group', name: 'Group'},
    { key:'Enterprise', name : 'Enterprise'}
  ],
  associationLimitHours:{
    minimum :1,
    maximum :999
  }  
}
export function show(userId) {
  return api.get('/users/hoteling-guest', { params: { userId } })
}

export function update(params) {
  return api.put('/users/hoteling-guest', params)
}

export function users(userId) {
  return api.get('users', { params: { userId } })
}


export function bulk(params) {
  return api.put('bulk', params)
}

export default { index, bulk, show, users, update, options }
 



