import { api } from '..'

export function index( url ) {
  return api.get(url('/system/languages'))
}
export default { index }

