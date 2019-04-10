import api from '.'

function get() {
  return api.get('ui/templates').json()
}

export default { get }
