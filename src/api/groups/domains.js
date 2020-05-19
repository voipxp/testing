import { api } from '..'
 
export const domains = (groupId, serviceProviderId) => {
  return api.get('groups/domains', {
    params: { groupId, serviceProviderId }
  })
}

export default { domains }
