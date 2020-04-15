import {
  GroupSeriesCompletion
} from '@/components/groups'
import {
  GroupAutoAttendants,
  GroupCallCenters,
  GroupCallPark,
  GroupCallPickups,
  GroupCollaborate,
  GroupFlexibleSeatingHosts,
  GroupHuntGroups,
  GroupMeetMe,
  GroupMusicOnHold,
  GroupNightForwarding,
  GroupPagingGroups,
  GroupTrunkGroups,
  GroupVoiceMessaging,
  GroupVirtualOnNetEnterpriseExtensions
} from '@/components/groups/service-settings'
  
export const groupServiceRoutes = [
  {
	name :'Auto Receptionist',
    component: GroupAutoAttendants,
    hasModuleRead: 'Auto Attendant',
    path: 'autoAttendants',
    services: ['Auto Attendant'],
    hasLevel: 'Group'
  },
  {
	name :'Call Center',  
    component: GroupCallCenters,
    hasModuleRead: 'Call Center',
    path: 'callCenters',
	hasModuleRead: 'Call Center',
    services: ['Call Center']
  },
  {
	 name :'Call Park',
	 component: GroupCallPark,
    //angularComponent: 'groupCallPark',
    hasModuleRead: 'Call Park',
    path: 'callPark',
    services: ['Call Park'],
    hasLevel: 'Group'
	 
  },
  {
	name :'Call Pickup',
    component: GroupCallPickups,
    hasModuleRead: 'Call Pickup',
    path: 'callPickup',
    services: ['Call Pickup'],
    hasLevel: 'Group'
  },
  {
	name :'Collaborate - Audio',
    component: GroupCollaborate,
    hasModuleRead: 'Collaborate - Audio',
    path: 'collaborate',
    services: ['Collaborate - Audio'],
    hasLevel: 'Group'
  },
  {
	name :'Flexible Seating Host',
    component: GroupFlexibleSeatingHosts,
    hasModuleRead: 'Flexible Seating Host',
    path: 'flexibleSeatingHosts',
    services: ['Flexible Seating Hosts'],
    hasLevel: 'Group'
  },
  {
	name :'Hunt Group',
    component: GroupHuntGroups,
    hasModuleRead: 'Hunt Group',
    path: 'huntGroups',
    services: ['Hunt Group'],
    hasLevel: 'Group',
  },
  {
	name :'Meet-Me Conferencing',
    component: GroupMeetMe,
    hasModuleRead: 'Meet-Me Conferencing',
    path: 'meetMe',
    services: ['Meet-Me Conferencing'],
    hasLevel: 'Group'
  },
  {
	name :'Music On Hold',
    component: GroupMusicOnHold,
    hasModuleRead: 'Music On Hold',
    path: 'musicOnHold',
    services: ['Music On Hold'],
    hasLevel: 'Group'
  },
  {
	name :'Group Night Forwarding',
    component: GroupNightForwarding,
    hasModuleRead: 'Group Night Forwarding',
    path: 'nightForwarding',
    services: ['Group Night Forwarding'],
    hasLevel: 'Group'
  },
  {
	name :'Group Paging',
    component: GroupPagingGroups,
    hasModuleRead: 'Group Paging',
    path: 'paging',
    services: ['Group Paging'],
    hasLevel: 'Group'
  },
  
  
  
  {
	name :'Series Completion',
    component: GroupSeriesCompletion,
    hasModuleRead: 'Series Completion',
    path: 'seriesCompletion',
    services: ['Series Completion'],
    hasLevel: 'Group'
  },
  {
	name :'Trunk Group',
    component: GroupTrunkGroups,
    hasModuleRead: 'Trunk Group',
    path: 'trunkGroups',
    services: ['Trunk Group'],
    hasLevel: 'Group'

  },
  {
	name :'Virtual On-Net Enterprise Extensions',
    component: GroupVirtualOnNetEnterpriseExtensions,
    hasModuleRead: 'Virtual On-Net Enterprise Extensions',
    path: 'virtualOnNetEnterpriseExtensions',
    services: ['Virtual On-Net Enterprise Extensions'],
    hasLevel: 'Group'
  },
  {
    name :'Voice Messaging Group',
    component: GroupVoiceMessaging,
    hasModuleRead: 'Voice Messaging Group',
    path: 'voiceMessaging',
    services: ['Voice Messaging Group'],
    hasLevel: 'Group'
  }
]
 
