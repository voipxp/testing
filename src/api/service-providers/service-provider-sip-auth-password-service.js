import { api } from '..'
const url = '/service-providers/sip-authentication-password-rules'
export const show = ( serviceProviderId ) => {
  return api.get(url, {
    params: { serviceProviderId }
  })
}

export default {
	show
}
