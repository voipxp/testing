import { api } from '.'

function get() {
  return api.get('ui/templates')
}

export default { get }
