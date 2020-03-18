import { api } from '..'

export function index( url ) {
  return api.get(url('/system/states-provinces'))
}
export default { index }


