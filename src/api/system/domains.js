import { api } from '..'
 
const url = '/system/domains' 
 
export const load = () => {
  return api.get( url )
}

export function create(params) {
  return api.post( url , params )
}

export function destroy(domainName) {
  return api.delete( url , { params: { domainName } })
}

export default { load, create , destroy }
