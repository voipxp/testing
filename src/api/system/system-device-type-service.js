import { api } from '..'

const url = '/system/device-types'

export const index = () => {
	return api.get(url)
}

export default { index }