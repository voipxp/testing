import { api } from '..'

function get() {
  return api.get('ui/settings')
}

export default { get }
