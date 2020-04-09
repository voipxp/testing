import {
  GroupSpeedDial8
} from '@/components/groups'
export const groupUserServiceRoutes = [
  {
    angularComponent: 'groupCallForwardingAlways',
    module: 'Call Forwarding Always',
    path: 'callForwardingAlways',
    services: ['Call Forwarding Always'],
    hasLevel: 'Group'
  }, 
  {
    angularComponent: 'groupCallForwardingBusy',
    module: 'Call Forwarding Busy',
    path: 'callForwardingBusy',
    services: ['Call Forwarding Busy'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallForwardingNoAnswer',
    module: 'Call Forwarding No Answer',
    path: 'callForwardingNoAnswer',
    services: ['Call Forwarding No Answer'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallForwardingNotReachable',
    module: 'Call Forwarding Not Reachable',
    path: 'callForwardingNotReachable',
    services: ['Call Forwarding Not Reachable'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallingLineIdDeliveryBlocking',
    module: 'Calling Line ID Delivery Blocking',
    path: 'callingLineIdDeliveryBlocking',
    services: ['Calling Line ID Delivery Blocking'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupCallRecording',
    module: 'Call Recording',
    path: 'callRecording',
    services: ['Call Recording'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupHotelingGuest',
    module: 'Hoteling Guest',
    path: 'hotelingGuest',
    services: ['Hoteling Guest'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupHotelingHost',
    module: 'Hoteling Host',
    path: 'hotelingHost',
    services: ['Hoteling Host'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupOutgoingCallingPlanUsers',
    module: 'Outgoing Calling Plan',
    path: 'outgoing-users',
    services: ['Outgoing Calling Plan'],
    hasLevel: 'Group',
    hasModuleRead: 'Group Calling Plan'
  },
  {
    component: GroupSpeedDial8,
    module: 'Speed Dial 8',
    path: 'speedDial8',
    services: ['Speed Dial 8'],
    hasLevel: 'Group'
  },
  {
    angularComponent: 'groupVoiceMessagingUser',
    module: 'Voice Messaging User',
    path: 'voiceMessagingUser',
    services: ['Voice Messaging User'],
    hasLevel: 'Group'
  }
]
 
