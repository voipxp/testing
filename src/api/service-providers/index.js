import { api } from '..'

function list() {
  return api.get('service-providers')
}

export default { list }
