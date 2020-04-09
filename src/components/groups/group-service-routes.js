import {
  GroupSpeedDial8,
  GroupSeriesCompletion
} from '@/components/groups'
export const groupServiceRoutes = [
  {
    angularComponent: 'autoAttendants',
    hasModuleRead: 'Auto Attendant',
    path: 'autoAttendants',
    services: ['Call Forwarding Always'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallCenters',
    hasModuleRead: 'Call Center',
    path: 'callCenters',
    services: ['Call Center'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallPark',
    hasModuleRead: 'Call Park',
    path: 'callPark',
    services: ['Call Park'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallPickups',
    hasModuleRead: 'Call Pickup',
    path: 'callPickup',
    services: ['Call Pickup'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCollaborate',
    hasModuleRead: 'Collaborate - Audio',
    path: 'collaborate',
    services: ['Collaborate - Audio'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupFlexibleSeatingHosts',
    hasModuleRead: 'Flexible Seating Guest',
    path: 'flexibleSeatingHosts',
    services: ['Flexible Seating Guest'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupNightForwarding',
    hasModuleRead: 'Group Night Forwarding',
    path: 'nightForwarding',
    services: ['Group Night Forwarding'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupPagingGroups',
    hasModuleRead: 'Group Paging',
    path: 'paging',
    services: ['Group Paging'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupHuntGroups',
    hasModuleRead: 'Hunt Group',
    path: 'huntGroups',
    services: ['Hunt Group'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupMeetMe',
    hasModuleRead: 'Meet-Me Conferencing',
    path: 'meetMe',
    services: ['Meet-Me Conferencing'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupMusicOnHoldIndex',
    hasModuleRead: 'Music On Hold',
    path: 'musicOnHold',
    services: ['Music On Hold'],
    hasLevel: 'Group'
  },
  {
    component: GroupSeriesCompletion,
    hasModuleRead: 'Series Completion',
    path: 'seriesCompletion',
    services: ['Series Completion'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupEnterpriseTrunks',
    hasModuleRead: 'Trunk Group',
    path: 'enterpriseTrunks',
    services: ['Trunk Group'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupVirtualOnNetEnterpriseExtensions',
    hasModuleRead: 'Virtual On-Net Enterprise Extensions',
    path: 'virtualOnNetEnterpriseExtensions',
    services: ['Virtual On-Net Enterprise Extensions'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupVoiceMessaging',
    hasModuleRead: 'Voice Messaging Group',
    path: 'voiceMessaging',
    services: ['Voice Messaging Group'],
    hasLevel: 'Group'
  }
]
 
