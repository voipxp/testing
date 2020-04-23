import {
  GroupSpeedDial8
} from './group-speed-dial-8'
export const groupUserServiceRoutes = [
  {
    name: 'Call Forwarding Always',
    path: 'callForwardingAlways',
    angularComponent: 'groupCallForwardingAlways',
    hasModuleRead: 'Call Forwarding Always',
    hasGroupService: ['Call Forwarding Always'],
    hasLevel: 'Group'
  }, 
  {
    name: 'Call Forwarding Busy',
	path: 'callForwardingBusy',
    angularComponent: 'groupCallForwardingBusy',
    hasModuleRead: 'Call Forwarding Busy',
    hasGroupService: ['Call Forwarding Busy'],
    hasLevel: 'Group'
  },
  {
    name: 'Call Forwarding No Answer',
    path: 'callForwardingNoAnswer',
    angularComponent: 'groupCallForwardingNoAnswer',
    hasModuleRead: 'Call Forwarding No Answer',
    hasGroupService: ['Call Forwarding No Answer'],
    hasLevel: 'Group'
  },
  {
    name : 'Call Forwarding Not Reachable',
    path: 'callForwardingNotReachable',
    angularComponent: 'groupCallForwardingNotReachable',
    hasModuleRead: 'Call Forwarding Not Reachable',
    hasGroupService: ['Call Forwarding Not Reachable'],
    hasLevel: 'Group'
  },
  {
    name: 'Calling Line ID Delivery Blocking',
    path: 'callingLineIdDeliveryBlocking',
    angularComponent: 'groupCallingLineIdDeliveryBlocking',
    hasModuleRead: 'Calling Line ID Delivery Blocking',
    hasGroupService: ['Calling Line ID Delivery Blocking'],
    hasLevel: 'Group'
  },
  {
    name: 'Call Recording',
    path: 'callRecording',
    angularComponent: 'groupCallRecording',
    hasModuleRead: 'Call Recording',
    hasGroupService: ['Call Recording'],
    hasLevel: 'Group'
  },
  {
    name: 'Hoteling Guest',
    path: 'hotelingGuest',
    angularComponent: 'groupHotelingGuest',
    hasModuleRead: 'Hoteling Guest',
    hasGroupService: ['Hoteling Guest'],
    hasLevel: 'Group'
  },
  {
    name: 'Hoteling Host',
    path: 'hotelingHost',
    angularComponent: 'groupHotelingHost',
    hasModuleRead: 'Hoteling Host',
    hasGroupService: ['Hoteling Host'],
    hasLevel: 'Group'
  },
  {
    name: 'Outgoing Calling Plan',
    path: 'callingPlans',
    angularComponent: 'groupOutgoingCallingPlanUsers',
    hasModuleRead: 'Outgoing Calling Plan',
    hasGroupService: ['Outgoing Calling Plan'],
    hasLevel: 'Group',
    hasModuleReadRead: 'Group Calling Plan'
  },
  {
    name: 'Speed Dial 8',
    path: 'speedDial8',
    component: GroupSpeedDial8,
    hasModuleRead: 'Speed Dial 8',
    hasGroupService: ['Speed Dial 8'],
    hasLevel: 'Group',
	  isBreadcrumb:false
  },
  {
    name: 'Voice Messaging User',
    path: 'voiceMessagingUser',
    angularComponent: 'groupVoiceMessagingUser',
    hasModuleRead: 'Voice Messaging User',
    hasGroupService: ['Voice Messaging User'],
    hasLevel: 'Group'
  }
]
 
