import { api } from '..'
 
const url = '/system/domains' 
 
export const load = () => {
  return api.get( url )
}

export function create(params) {
  return api.post( url , params )
}

export function destroy(domain) {
  return api.delete( url , { params: { domain } })
}

export default { load, create , destroy }
