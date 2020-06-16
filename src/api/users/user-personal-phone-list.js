import { api } from '..'
const url = 'users/personal-phone-list'

export const show = userId => api.get(url, { params: { userId } })

export const add = (obj) => {
  return api.post(url, obj).then(response => response.data)
}

export const update = (obj) => {
  return api.put(url, obj).then(response => response.data)
}

export const remove = (obj) => {
  return api.delete(url, { data: obj }).then(response => response.data)
}

export default { show, add, update, remove }
