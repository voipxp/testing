import { api } from '..'
  
const url = '/service-providers/domains'

export function load( serviceProviderId ) {
	return api.get(url, { params: { serviceProviderId } })
} 

export function update(params) {
	return api.put( url , params )
}

export default { load , update }
