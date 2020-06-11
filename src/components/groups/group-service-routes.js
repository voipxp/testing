import {
  GroupSeriesCompletion
} from '././group-series-completion'
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
          service :'Auto Attendant',
          path: 'autoReceptionist',
          component: GroupAutoAttendants,
          hasModuleRead: 'Auto Attendant',
          hasGroupService: ['Auto Attendant','Auto Attendant - Video','Auto Attendant - Standard'],
          hasLevel: 'Group'
        },
        {
          service :'Call Center',
          path: 'callCenters',
          component: GroupCallCenters,
          hasModuleRead: 'Call Center',
          hasGroupService: ['Call Center - Basic', 'Call Center Monitoring', 'Call Center - Premium', 'Call Center - Standard'],
          hasLevel: 'Group'
        },
        {
          service :'Call Park',
          path: 'callPark',
          component: GroupCallPark,
          hasModuleRead: 'Call Park',
          hasGroupService: ['Call Park'],
          hasLevel: 'Group'
        },
        {
          service :'Call Pickup',
          path: 'callPickups',
          component: GroupCallPickups,
          hasModuleRead: 'Call Pickup',
          hasGroupService: ['Call Pickup'],
          hasLevel: 'Group'
        },
        {
          service :'Collaborate - Audio',
          name :'Collaborate',
          path: 'collaborate',
          component: GroupCollaborate,
          hasModuleRead: 'Collaborate - Audio',
          hasGroupService: ['Collaborate - Audio'],
          hasLevel: 'Group'
        },
        {
          service :'Flexible Seating Guest',
          name :'Flexible Seating Hosts',
          path: 'flexibleSeatingHosts',
          component: GroupFlexibleSeatingHosts,
          hasModuleRead: 'Flexible Seating Guest',
          hasGroupService: ['Flexible Seating Guest'],
          hasLevel: 'Group'
        },
        {
          service :'Hunt Group',
          component: GroupHuntGroups,
          path: 'huntGroups',
          hasModuleRead: 'Hunt Group',
          hasGroupService: ['Hunt Group'],
          hasLevel: 'Group',
        },
        {
          service :'Meet-Me Conferencing',
          path: 'meetMeConferencing',
          component: GroupMeetMe,
          hasModuleRead: 'Meet-Me Conferencing',
          hasGroupService: ['Meet-Me Conferencing'],
          hasLevel: 'Group'
        },
        {
          service :'Music On Hold',
          path: 'musicOnHold',
          component: GroupMusicOnHold,
          hasModuleRead: 'Music On Hold',
          hasGroupService: ['Music On Hold'],
          hasLevel: 'Group'
        },
        {
          service :'Group Night Forwarding',
          path: 'groupNightForwarding',
          component: GroupNightForwarding,
          hasModuleRead: 'Group Night Forwarding',
          hasGroupService: ['Group Night Forwarding'],
          hasLevel: 'Group'
        },
        {
          service :'Group Paging',
          path: 'groupPaging',
          component: GroupPagingGroups,
          hasModuleRead: 'Group Paging',
          hasGroupService: ['Group Paging'],
          hasLevel: 'Group'
        },
        {
          service :'Series Completion',
          path: 'seriesCompletion',
          component: GroupSeriesCompletion,
          hasModuleRead: 'Series Completion',
          hasGroupService: ['Series Completion'],
          hasLevel: 'Group',
          isBreadcrumb:false
        },
        {
          service :'Trunk Group',
          path: 'trunkGroups',
          component: GroupTrunkGroups,
          hasModuleRead: 'Trunk Group',
          hasGroupService: ['Trunk Group'],
          hasLevel: 'Group',
          hasPolicy: 'trunkGroupAccess'
        },
        {
          service :'Virtual On-Net Enterprise Extensions',
          path: 'virtualOnNetEnterpriseExtensions',
          component: GroupVirtualOnNetEnterpriseExtensions,
          hasModuleRead: 'Virtual On-Net Enterprise Extensions',
          hasGroupService: ['Virtual On-Net Enterprise Extensions'],
          hasLevel: 'Group'
        },
        {
          service :'Voice Messaging Group',
          path: 'voiceMessagingGroup',
          component: GroupVoiceMessaging,
          hasModuleRead: 'Voice Messaging Group',
          hasGroupService: ['Voice Messaging Group'],
          hasLevel: 'Group'
        }
]

