import { api } from '.'

function get() {
  return api.get('ui/applications')
}

export default { get }
