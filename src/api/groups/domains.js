import { api } from '..'
 
const url = 'groups/domains' 
export const domains = (groupId, serviceProviderId) => {
  return api.get( url, {
    params: { groupId, serviceProviderId }
  })
}

export function update(params) {
	return api.put( url, params )
}

export default { domains , update }
