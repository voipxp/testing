import { stringify } from 'query-string'

const userTypes = {
  'Auto Attendant - Standard': 'autoAttendants/autoAttendant',
  'Auto Attendant - Video': 'autoAttendants/autoAttendant',
  'Auto Attendant': 'autoAttendants/autoAttendant',
  'BroadWorks Anywhere Portal': null,
  'BroadWorks Anywhere': null,
  'Call Center - Basic': 'callCenters/callCenter',
  'Call Center - Premium': 'callCenters/callCenter',
  'Call Center - Standard': 'callCenters/callCenter',
  'Call Center': 'callCenters/callCenter',
  'Collaborate Bridge': 'collaborate/bridge',
  'Find-me/Follow-me': null,
  'Flexible Seating Host': null,
  'Group Paging': 'paging/group',
  'Hunt Group': 'huntGroups/huntGroup',
  'Instant Conference Bridge': null,
  'Instant Group Call': null,
  'Meet-Me Conference Bridge': 'meetMe/bridge',
  'Meet-Me Conferencing': 'meetMe/bridge',
  'Music On Hold': null,
  'Normal': 'users',
  'Route Point': null,
  'Voice Messaging': null,
  'VoiceXML': null
}

export const userPath = (user, type) => {
  const userType = type || user.userType || user.serviceType || 'Normal'
  const path = userTypes[userType]
  if (!path) return
  if (path === 'users') {
    return `/users/${user.serviceProviderId}/${user.groupId}/${user.userId}`
  } else {
    return `/groups/${user.serviceProviderId}/${
      user.groupId
    }/${path}?${stringify({ serviceUserId: user.userId })}`
  }
}

export const groupPath = group => {
  return `/groups/${group.serviceProviderId}/${group.groupId}`
}

export const serviceProviderPath = serviceProvider => {
  return `/serviceProviders/${serviceProvider.serviceProviderId}`
}
