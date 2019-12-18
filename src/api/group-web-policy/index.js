import { api } from '..'

export const show = (serviceProviderId, groupId) => {
	return api.get('groups/policy', { params: {serviceProviderId, groupId} })
}

export const showWithToken = (serviceProviderId, groupId, token) => {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null
  return api.get('groups/policy', { params: {serviceProviderId, groupId} })
}

export const options = () => {
	return options = {
				policies: {
				  callingPlanAccess: ['Full', 'None'],
				  extensionAccess: [
					'Full',
					'Read-Only Profile',
					'None'
				  ],
				  ldapIntegrationAccess: ['Full', 'Read-Only', 'None'],
				  voiceMessagingAccess: ['Full', 'None'],
				  departmentAdminUserAccess: ['Full', 'Read-Only Profile', 'No Profile', 'None'],
				  departmentAdminTrunkGroupAccess: ['Full', 'None'],
				  departmentAdminPhoneNumberExtensionAccess: ['Full', 'Read-Only'],
				  departmentAdminCallingLineIdNumberAccess: ['Full', 'Read-Only'],
				  userAuthenticationAccess: ['Full', 'None'],
				  userGroupDirectoryAccess: ['Full', 'None'],
				  userProfileAccess: [
					'Full',
					'Read-Only',
					'None'
				  ],
				  userEnhancedCallLogAccess: ['Full', 'Read-Only'],
				  userAutoAttendantNameDialingAccess: ['Full', 'None']
				}
			}
}

export default { show, options, showWithToken }