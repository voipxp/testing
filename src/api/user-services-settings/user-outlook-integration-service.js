import { api } from '..'

export const options = {
  contactRetrievalSelection : [
    { key: 'Retrieve Default Contact Folder Only', name: 'Retrieve Default Contact Folder Only' },
    { key: 'Retrieve All Contacts', name: 'Retrieve All Contacts' } 
  ]
}
export function show(userId) {
  return api.get('/users/outlook-integration', { params: { userId } })
}

export function update(params) {
  return api.put('/users/outlook-integration', params)
}

export default { show, update, options }



