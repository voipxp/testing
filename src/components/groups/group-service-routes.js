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
          path: 'auto-attendants',
          component: GroupAutoAttendants,
          hasModuleRead: 'Auto Attendant',
          services: ['Auto Attendant'],
          hasLevel: 'Group'
        },
        {
          name :'Call Center', 
          path: 'call-centers', 
          component: GroupCallCenters,
          hasModuleRead: 'Call Center',
          services: ['Call Center']
        },
        {
          name :'Call Park',
          path: 'call-park',
          component: GroupCallPark,
          hasModuleRead: 'Call Park',
          services: ['Call Park'],
          hasLevel: 'Group'
        },
        {
          name :'Call Pickup',
          path: 'call-pickup',
          component: GroupCallPickups,
          hasModuleRead: 'Call Pickup',
          services: ['Call Pickup'],
          hasLevel: 'Group'
        },
        {
          name :'Collaborate',
          path: 'collaborate',
          component: GroupCollaborate,
          hasModuleRead: 'Collaborate - Audio',
          services: ['Collaborate - Audio'],
          hasLevel: 'Group'
        },
        {
          name :'Flexible Seating Host',
          path: 'flexible-seating-hosts',
          component: GroupFlexibleSeatingHosts,
          hasModuleRead: 'Flexible Seating Host',
          services: ['Flexible Seating Guest'],
          hasLevel: 'Group'
        },
        {
          name :'Hunt Group',
          component: GroupHuntGroups,
          path: 'hunt-groups',
          hasModuleRead: 'Hunt Group',
          services: ['Hunt Group'],
          hasLevel: 'Group',
        },
        {
          name :'Meet-Me Conferencing',
          path: 'meet-me',
          component: GroupMeetMe,
          hasModuleRead: 'Meet-Me Conferencing',
          services: ['Meet-Me Conferencing'],
          hasLevel: 'Group'
        },
        {
          name :'Music On Hold',
          path: 'music-on-hold',
          component: GroupMusicOnHold,
          hasModuleRead: 'Music On Hold',
          services: ['Music On Hold'],
          hasLevel: 'Group'
        },
        {
          name :'Group Night Forwarding',
          path: 'group-night-forwarding',
          component: GroupNightForwarding,
          hasModuleRead: 'Group Night Forwarding',
          services: ['Group Night Forwarding'],
          hasLevel: 'Group'
        },
        {
          name :'Group Paging',
          path: 'group-paging',
          component: GroupPagingGroups,
          hasModuleRead: 'Group Paging',
          services: ['Group Paging'],
          hasLevel: 'Group'
        },
        {
          name :'Series Completion',
          path: 'series-completion',
          component: GroupSeriesCompletion,
          hasModuleRead: 'Series Completion',
          services: ['Series Completion'],
          hasLevel: 'Group'
        },
        {
          name :'Trunk Group',
          path: 'trunk-groups',
          component: GroupTrunkGroups,
          hasModuleRead: 'Trunk Group',
          services: ['Trunk Group'],
          hasLevel: 'Group'
        },
        {
          name :'Virtual On-Net Enterprise Extensions',
          path: 'virtual-on-net-enterprise-extensions',
          component: GroupVirtualOnNetEnterpriseExtensions,
          hasModuleRead: 'Virtual On-Net Enterprise Extensions',
          services: ['Virtual On-Net Enterprise Extensions'],
          hasLevel: 'Group'
        },
        {
          name :'Voice Messaging Group',
          component: GroupVoiceMessaging,
          hasModuleRead: 'Voice Messaging Group',
          path: 'voice-messaging-group',
          services: ['Voice Messaging Group'],
          hasLevel: 'Group'
        }
]
 
