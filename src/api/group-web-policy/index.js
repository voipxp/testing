import { api } from '..'

export const show = (serviceProviderId, groupId) => {
	return api.get('groups/policy', { params: {serviceProviderId, groupId} })
}

export const update = (serviceProviderId, groupId, data) => {
 	const params = { serviceProviderId, groupId, ...data }
	return api.put('groups/policy', params)
}

export const showWithToken = (serviceProviderId, groupId, token) => {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null
  return api.get('groups/policy', { params: {serviceProviderId, groupId} })
}

export const options = {
	policies: {
		callingPlanAccess: ['Full', 'Restricted'],
		extensionAccess: ['Full', 'Read-Only', 'None'],
		ldapIntegrationAccess: ['Full', 'Read-Only', 'None'],
		voiceMessagingAccess: ['Full', 'Restricted'],
		departmentAdminUserAccess: ['Full', 'Read-Only Profile', 'No Profile', 'None'],
		departmentAdminTrunkGroupAccess: ['Full', 'None'],
		departmentAdminPhoneNumberExtensionAccess: ['Full', 'Read-Only'],
		departmentAdminCallingLineIdNumberAccess: ['Full', 'Read-Only'],
		userAuthenticationAccess: ['Full', 'None'],
		userGroupDirectoryAccess: ['Full', 'None'],
		userProfileAccess: ['Full', 'Read-Only', 'None' ],
		userEnhancedCallLogAccess: ['Full', 'Read-Only'],
		userAutoAttendantNameDialingAccess: ['Full', 'None']
	}
}

export default { show, options, showWithToken, update }
