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
          name :'Auto Receptionist',
          path: 'autoReceptionist',
          component: GroupAutoAttendants,
          hasModuleRead: 'Auto Attendant',
          hasGroupService: ['Auto Attendant','Auto Attendant - Video','Auto Attendant - Standard'],
          hasLevel: 'Group'
        },


        {
          name :'Call Center', 
          path: 'callCenters', 
          component: GroupCallCenters,
          hasModuleRead: 'Call Center',
          hasGroupService: ['Call Center - Basic', 'Call Center Monitoring', 'Call Center - Premium', 'Call Center - Standard'],
          hasLevel: 'Group'
        },
        {
          name :'Call Park',
          path: 'callPark',
          component: GroupCallPark,
          hasModuleRead: 'Call Park',
          hasGroupService: ['Call Park'],
          hasLevel: 'Group'
        },
        {
          name :'Call Pickup',
          path: 'callPickup',
          component: GroupCallPickups,
          hasModuleRead: 'Call Pickup',
          hasGroupService: ['Call Pickup'],
          hasLevel: 'Group'
        },
        {
          name :'Collaborate',
          path: 'collaborate',
          component: GroupCollaborate,
          hasModuleRead: 'Collaborate - Audio',
          hasGroupService: ['Collaborate - Audio'],
          hasLevel: 'Group'
        },
        {
          name :'Flexible Seating Host',
          path: 'flexibleSeatingHosts',
          component: GroupFlexibleSeatingHosts,
          hasModuleRead: 'Flexible Seating Guest',
          hasGroupService: ['Flexible Seating Guest'],
          hasLevel: 'Group'
        },
        {
          name :'Hunt Group',
          component: GroupHuntGroups,
          path: 'huntGroups',
          hasModuleRead: 'Hunt Group',
          hasGroupService: ['Hunt Group'],
          hasLevel: 'Group',
        },
        {
          name :'Meet-Me Conferencing',
          path: 'meetMeConferencing',
          component: GroupMeetMe,
          hasModuleRead: 'Meet-Me Conferencing',
          hasGroupService: ['Meet-Me Conferencing'],
          hasLevel: 'Group'
        },
        {
          name :'Music On Hold',
          path: 'musicOnHold',
          component: GroupMusicOnHold,
          hasModuleRead: 'Music On Hold',
          hasGroupService: ['Music On Hold'],
          hasLevel: 'Group'
        },
        {
          name :'Group Night Forwarding',
          path: 'groupNightForwarding',
          component: GroupNightForwarding,
          hasModuleRead: 'Group Night Forwarding',
          hasGroupService: ['Group Night Forwarding'],
          hasLevel: 'Group'
        },
        {
          name :'Group Paging',
          path: 'groupPaging',
          component: GroupPagingGroups,
          hasModuleRead: 'Group Paging',
          hasGroupService: ['Group Paging'],
          hasLevel: 'Group'
        },
        {
          name :'Series Completion',
          path: 'seriesCompletion',
          component: GroupSeriesCompletion,
          hasModuleRead: 'Series Completion',
          hasGroupService: ['Series Completion'],
          hasLevel: 'Group',
          isBreadcrumb:false
        },
        {
          name :'Trunk Group',
          path: 'trunkGroups',
          component: GroupTrunkGroups,
          hasModuleRead: 'Trunk Group',
          hasGroupService: ['Trunk Group'],
          hasLevel: 'Group'
        },
        {
          name :'Virtual On-Net Enterprise Extensions',
          path: 'virtualOnNetEnterpriseExtensions',
          component: GroupVirtualOnNetEnterpriseExtensions,
          hasModuleRead: 'Virtual On-Net Enterprise Extensions',
          hasGroupService: ['Virtual On-Net Enterprise Extensions'],
          hasLevel: 'Group'
        },
        {
          name :'Voice Messaging Group',
          path: 'voiceMessagingGroup',
          component: GroupVoiceMessaging,
          hasModuleRead: 'Voice Messaging Group',
          hasGroupService: ['Voice Messaging Group'],
          hasLevel: 'Group'
        }
]
 
