import { api } from '..'
import _ from 'lodash'

const url = '/tasks'

export const index = (limit, status, types) => {
const type = _.isArray(types) ? types.join(',') : types

return api.get(url, { params: { limit, status, type } })  
}

export const create = (data) => api.post(url, data)

export const show = (id) => api.get(url , { params: { id } })

export const TaskService = {
	index: index,
	show: show,
	create: create
}