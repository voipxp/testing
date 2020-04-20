import { api } from '..'

export function index() {
  return api.get('/system/time-zones')
}
export default { index }
