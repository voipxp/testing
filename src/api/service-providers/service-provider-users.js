import { api } from '..'

const url = '/users'

export const show = serviceProviderId => {
  return api.get(url, {
    params: { serviceProviderId }
  })
}
 
export default {
  show
}
