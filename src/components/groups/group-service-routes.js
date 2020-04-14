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
    component: GroupAutoAttendants,
    hasModuleRead: 'Auto Attendant',
    path: 'autoAttendants',
    services: ['Auto Attendant'],
    hasLevel: 'Group'
  },
  {
	  
    component: GroupCallCenters,
    hasModuleRead: 'Call Center',
    path: 'callCenters',
	hasModuleRead: 'Call Center',
    services: ['Call Center'],
	module:'Call Center'
  },
  {
	 component: GroupCallPark,
    //angularComponent: 'groupCallPark',
    hasModuleRead: 'Call Park',
    path: 'callPark',
    services: ['Call Park'],
    hasLevel: 'Group'
	 
  },
  {
    component: GroupCallPickups,
    hasModuleRead: 'Call Pickup',
    path: 'callPickup',
    services: ['Call Pickup'],
    hasLevel: 'Group'
  },
  {
    component: GroupCollaborate,
    hasModuleRead: 'Collaborate - Audio',
    path: 'collaborate',
    services: ['Collaborate - Audio'],
    hasLevel: 'Group'
  },
  {
    component: GroupFlexibleSeatingHosts,
    hasModuleRead: 'Flexible Seating Guest',
    path: 'flexibleSeatingHosts',
    services: ['Flexible Seating Guest'],
    hasLevel: 'Group'
  },
  {
    component: GroupHuntGroups,
    hasModuleRead: 'Hunt Group',
    path: 'huntGroups',
    services: ['Hunt Group'],
    hasLevel: 'Group'
  },
  {
    component: GroupMeetMe,
    hasModuleRead: 'Meet-Me Conferencing',
    path: 'meetMe',
    services: ['Meet-Me Conferencing'],
    hasLevel: 'Group'
  },
  {
    component: GroupMusicOnHold,
    hasModuleRead: 'Music On Hold',
    path: 'musicOnHold',
    services: ['Music On Hold'],
    hasLevel: 'Group'
  },
  {
    component: GroupNightForwarding,
    hasModuleRead: 'Group Night Forwarding',
    path: 'nightForwarding',
    services: ['Group Night Forwarding'],
    hasLevel: 'Group'
  },
  {
    component: GroupPagingGroups,
    hasModuleRead: 'Group Paging',
    path: 'paging',
    services: ['Group Paging'],
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
    component: GroupTrunkGroups,
    hasModuleRead: 'Trunk Group',
    path: 'trunkGroups',
    services: ['Trunk Group'],
    hasLevel: 'Group'

  },
  {
    component: GroupVirtualOnNetEnterpriseExtensions,
    hasModuleRead: 'Virtual On-Net Enterprise Extensions',
    path: 'virtualOnNetEnterpriseExtensions',
    services: ['Virtual On-Net Enterprise Extensions'],
    hasLevel: 'Group'
  },
  {
    component: GroupVoiceMessaging,
    hasModuleRead: 'Voice Messaging Group',
    path: 'voiceMessaging',
    services: ['Voice Messaging Group'],
    hasLevel: 'Group'
  }
]
 
