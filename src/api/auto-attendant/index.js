import { api } from '..'

export const announcements = (groupId, serviceProviderId) => {
  return api.get('groups/announcements', {
    params: { groupId, serviceProviderId }
  })
}

export const schedules = (groupId, serviceProviderId) => {
  return api.get('groups/schedules', {
    params: { groupId, serviceProviderId }
  })
}

export const domains = (groupId, serviceProviderId) => {
  return api.get('groups/domains', {
    params: { groupId, serviceProviderId }
  })
}

export const numbers = (groupId, serviceProviderId) => {
  return api.get('groups/dns', {
    params: { groupId, serviceProviderId }
  })
}

export const huntGroups = (groupId, serviceProviderId) => {
  return api.get('groups/hunt-groups', {
    params: { groupId, serviceProviderId }
  })
}

export const callCenters = (groupId, serviceProviderId) => {
  return api.get('groups/call-centers', {
    params: { groupId, serviceProviderId }
  })
}

export const operators = (groupId, serviceProviderId) => {
  return api.get('users', {
    params: { groupId, serviceProviderId }
  })
}

export const addAutoAttendant = (groupId, serviceProviderId, params) => {
  return api.post('groups/auto-attendants', {
    groupId,
    serviceProviderId,
    isEnterprise: false,
    serviceUserId: params.serviceUserId,
    serviceInstanceProfile: {
      name: params.serviceInstanceProfile.name,
      callingLineIdLastName:
        params.serviceInstanceProfile.callingLineIdLastName,
      callingLineIdFirstName:
        params.serviceInstanceProfile.callingLineIdFirstName,
      extension: params.serviceInstanceProfile.extension,
      phoneNumber: params.serviceInstanceProfile.phoneNumber
    },
    type: params.type,
    firstDigitTimeoutSeconds: 10,
    extensionDialingScope: 'Group',
    nameDialingScope: 'Group',
    nameDialingEntries: 'LastName + FirstName',
    enableVideo: false
  })
}

export const updateAutoAttendant = (groupId, serviceProviderId, params) => {
  return api.put('groups/auto-attendants', {
    groupId,
    serviceProviderId,
    serviceInstanceProfile: {
      name: params.serviceInstanceProfile.name,
      callingLineIdLastName:
        params.serviceInstanceProfile.callingLineIdLastName,
      callingLineIdFirstName:
        params.serviceInstanceProfile.callingLineIdFirstName
    },
    type: params.type,
    serviceUserId: params.serviceUserId,
    businessHoursMenu: params.businessHoursMenu,
    afterHoursMenu: params.afterHoursMenu
  })
}

/* export const addSubMenu = params => {
  return api.post('groups/auto-attendants/submenus', {
    serviceUserId: params.serviceUserId,
    submenuId: params.submenuId,
    announcementSelection: 'Default',
    enableLevelExtensionDialing: false
  })
}

export const updateSubMenu = params => {
  return api.put('groups/auto-attendants/submenus', {
    serviceUserId: params.serviceUserId,
    submenuId: params.submenuId,
    keys: params.subMenu,
    announcementSelection: 'Default'
  })
}*/

export default {
  announcements,
  schedules,
  domains,
  numbers,
  huntGroups,
  callCenters,
  operators,
  addAutoAttendant,
  updateAutoAttendant
  // addSubMenu,
  // updateSubMenu
}
