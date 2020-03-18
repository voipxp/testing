import { api } from '..'

export function index() {
  return api.get('/system/languages')
}
export default { index }

