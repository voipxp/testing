import { api } from '..'

function get() {
  return api.get('ui/modules')
}

export default { get }
