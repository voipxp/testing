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
  
export const groupUserServiceRoutes = [
        {
          name :'Auto Receptionist',
          path: 'auto-attendants',
          component: GroupAutoAttendants,
          hasModuleRead: 'Auto Attendant',
          hasGroupService: ['Auto Attendant'],
          hasLevel: 'Group'
        },
        {
          name :'Call Center', 
          path: 'call-centers', 
          component: GroupCallCenters,
          hasModuleRead: 'Call Center',
          hasGroupService: ['Call Center - Basic', '	Call Center Monitoring', 'Call Center - Premium', 'Call Center - Standard']
        },
        {
          name :'Call Park',
          path: 'call-park',
          component: GroupCallPark,
          hasModuleRead: 'Call Park',
          hasGroupService: ['Call Park'],
          hasLevel: 'Group'
        },
        {
          name :'Call Pickup',
          path: 'call-pickup',
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
          path: 'flexible-seating-hosts',
          component: GroupFlexibleSeatingHosts,
          hasModuleRead: 'Flexible Seating Host',
          hasGroupService: ['Flexible Seating Guest'],
          hasLevel: 'Group'
        },
        {
          name :'Hunt Group',
          component: GroupHuntGroups,
          path: 'hunt-groups',
          hasModuleRead: 'Hunt Group',
          hasGroupService: ['Hunt Group'],
          hasLevel: 'Group',
        },
        {
          name :'Meet-Me Conferencing',
          path: 'meet-me-conferencing',
          component: GroupMeetMe,
          hasModuleRead: 'Meet-Me Conferencing',
          hasGroupService: ['Meet-Me Conferencing'],
          hasLevel: 'Group'
        },
        {
          name :'Music On Hold',
          path: 'music-on-hold',
          component: GroupMusicOnHold,
          hasModuleRead: 'Music On Hold',
          hasGroupService: ['Music On Hold'],
          hasLevel: 'Group'
        },
        {
          name :'Group Night Forwarding',
          path: 'group-night-forwarding',
          component: GroupNightForwarding,
          hasModuleRead: 'Group Night Forwarding',
          hasGroupService: ['Group Night Forwarding'],
          hasLevel: 'Group'
        },
        {
          name :'Group Paging',
          path: 'group-paging',
          component: GroupPagingGroups,
          hasModuleRead: 'Group Paging',
          hasGroupService: ['Group Paging'],
          hasLevel: 'Group'
        },
        {
          name :'Series Completion',
          path: 'series-completion',
          component: GroupSeriesCompletion,
          hasModuleRead: 'Series Completion',
          hasGroupService: ['Series Completion'],
          hasLevel: 'Group',
		  isBreadcrumb:false
        },
        {
          name :'Trunk Group',
          path: 'trunk-groups',
          component: GroupTrunkGroups,
          hasModuleRead: 'Trunk Group',
          hasGroupService: ['Trunk Group'],
          hasLevel: 'Group'
        },
        {
          name :'Virtual On-Net Enterprise Extensions',
          path: 'virtual-on-net-enterprise-extensions',
          component: GroupVirtualOnNetEnterpriseExtensions,
          hasModuleRead: 'Virtual On-Net Enterprise Extensions',
          hasGroupService: ['Virtual On-Net Enterprise Extensions'],
          hasLevel: 'Group'
        },
        {
          name :'Voice Messaging Group',
          component: GroupVoiceMessaging,
          hasModuleRead: 'Voice Messaging Group',
          path: 'voice-messaging-group',
          hasGroupService: ['Voice Messaging Group'],
          hasLevel: 'Group'
        }
]