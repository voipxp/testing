import {
  GroupSpeedDial8
} from '@/components/groups'
export const groupUserServiceRoutes = [
  {
    name: 'Call Forwarding Always',
    path: 'callForwardingAlways',
    angularComponent: 'groupCallForwardingAlways',
    hasModuleRead: 'Call Forwarding Always',
    services: ['Call Forwarding Always'],
    hasLevel: 'Group'
  }, 
  {
    name: 'Call Forwarding Busy',
    angularComponent: 'groupCallForwardingBusy',
    hasModuleRead: 'Call Forwarding Busy',
    path: 'callForwardingBusy',
    services: ['Call Forwarding Busy'],
    hasLevel: 'Group'
  },
  {
    name: 'Call Forwarding Busy',
    path: 'callForwardingNoAnswer',
    angularComponent: 'groupCallForwardingNoAnswer',
    hasModuleRead: 'Call Forwarding No Answer',
    services: ['Call Forwarding No Answer'],
    hasLevel: 'Group'
  },
  {
    name : 'Call Forwarding Not Reachable',
    path: 'callForwardingNotReachable',
    angularComponent: 'groupCallForwardingNotReachable',
    hasModuleRead: 'Call Forwarding Not Reachable',
    services: ['Call Forwarding Not Reachable'],
    hasLevel: 'Group'
  },
  {
    name: 'Calling Line ID Delivery Blocking',
    angularComponent: 'groupCallingLineIdDeliveryBlocking',
    path: 'callingLineIdDeliveryBlocking',
    hasModuleRead: 'Calling Line ID Delivery Blocking',
    services: ['Calling Line ID Delivery Blocking'],
    hasLevel: 'Group'
  },
  {
    name: 'Call Recording',
    angularComponent: 'groupCallRecording',
    path: 'callRecording',
    hasModuleRead: 'Call Recording',
    services: ['Call Recording'],
    hasLevel: 'Group'
  },
  {
    name: 'Hoteling Guest',
    angularComponent: 'groupHotelingGuest',
    path: 'hotelingGuest',
    hasModuleRead: 'Hoteling Guest',
    services: ['Hoteling Guest'],
    hasLevel: 'Group'
  },
  {
    name: 'Hoteling Host',
    path: 'hotelingHost',
    angularComponent: 'groupHotelingHost',
    hasModuleRead: 'Hoteling Host',
    services: ['Hoteling Host'],
    hasLevel: 'Group'
  },
  {
    name: 'Outgoing Calling Plan',
    path: 'outgoing-users',
    angularComponent: 'groupOutgoingCallingPlanUsers',
    hasModuleRead: 'Outgoing Calling Plan',
    services: ['Outgoing Calling Plan'],
    hasLevel: 'Group',
    hashasModuleReadRead: 'Group Calling Plan'
  },
  {
    name: 'Speed Dial 8',
    path: 'speedDial8',
    component: GroupSpeedDial8,
    hasModuleRead: 'Speed Dial 8',
    services: ['Speed Dial 8'],
    hasLevel: 'Group',
	  isBreadcrumb:false
  },
  {
    name: 'Voice Messaging User',
    angularComponent: 'groupVoiceMessagingUser',
    path: 'voiceMessagingUser',
    hasModuleRead: 'Voice Messaging User',
    services: ['Voice Messaging User'],
    hasLevel: 'Group'
  }
]
 
