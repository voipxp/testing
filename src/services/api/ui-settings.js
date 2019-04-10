import api from '.'

function get() {
  return api.get('ui/settings').json()
}

export default { get }
