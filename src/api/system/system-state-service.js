import { api } from '..'

export function index() {
  return api.get('/system/states-provinces')
}
export default { index }


