import { api } from '..'

export function index( url ) {
  return api.get(url('/system/time-zones'))
}
export default { index }
