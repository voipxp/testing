import { UserSpeedDial8 } from './user-speed-dial-8'
import { UserIntercept } from './user-intercept'
import { UserAlternateNumbers } from './service-settings/user-alternate-numbers'
import { UserAnonymousCallRejection } from './service-settings/user-anonymous-call-rejection'
import { UserBargeInExempt } from './service-settings/user-barge-in-exempt'
import { UserCallForwardingAlways } from './service-settings/user-call-forwarding-always'
import { UserCallForwardingAlwaysSecondary } from './service-settings/user-call-forwarding-always-secondary'
import { UserCallForwardingBusy } from './service-settings/user-call-forwarding-busy'
import { UserCallForwardingNoAnswer } from './service-settings/user-call-forwarding-no-answer'
import { UserCallForwardingNotReachable } from './service-settings/user-call-forwarding-not-reachable'
import { UserCallingLineIdDeliveryBlocking } from './service-settings/user-calling-line-id-delivery-blocking'
import { UserCallingLineIdDeliveryOverride } from './service-settings/user-calling-line-id-delivery-Override'
import { UserBroadWorksAnywhere } from './service-settings/user-broadworks-anywhere'
import { UserBroadWorksMobility } from './service-settings/user-broadworks-mobility'
import { UserCallingNameRetrieval } from './service-settings/user-calling-name-retrieval'
import { UserCallingNameDelivery } from './service-settings/user-calling-name-delivery'



export const userServiceRoutes = [
  {
    component: UserAlternateNumbers,
    module: 'Alternate Numbers',
    path: 'alternate-numbers',
    services: ['Alternate Numbers']
  },
  {
    angularComponent: 'userAdviceOfCharge',
    module: 'Advice Of Charge',
    path: 'advice-of-charge',
    services: ['Advice Of Charge']
  },
  {
    component: UserAnonymousCallRejection,
    module: 'Anonymous Call Rejection',
    path: 'anonymous-call-rejection',
    services: ['Anonymous Call Rejection']
  },
  {
    angularComponent: 'userAuthentication',
    module: 'Authentication',
    path: 'authentication',
    services: ['Authentication']
  },
  {
    angularComponent: 'userAutomaticCallback',
    module: 'Automatic Callback',
    path: 'automatic-callback',
    services: ['Automatic Callback']
  },
  {
    angularComponent: 'userAutomaticHoldRetrieve',
    module: 'Automatic Hold/Retrieve',
    path: 'automatic-hold-retrieve',
    services: ['Automatic Hold/Retrieve']
  },
  {
    component: UserBargeInExempt,
    module: 'Barge-in Exempt',
    path: 'barge-in-exempt',
    services: ['Barge-in Exempt']
  },
  {
    component: UserBroadWorksAnywhere,
    module: 'BroadWorks Anywhere',
    path: 'broadworks-anywhere',
    services: ['BroadWorks Anywhere']
  },
  {
    component: UserBroadWorksMobility,
    module: 'BroadWorks Mobility',
    path: 'broadworks-mobility',
    services: ['BroadWorks Mobility']
  },
  {
    angularComponent: 'userBusyLampField',
    module: 'Busy Lamp Field',
    path: 'busy-lamp-field',
    services: ['Busy Lamp Field']
  },
  {
    angularComponent: 'userCallCenter',
    module: 'Call Center',
    path: 'call-center',
    services: [
      'Call Center - Basic',
      'Call Center - Standard',
      'Call Center - Premium'
    ]
  },
  {
    component: UserCallForwardingAlways,
    module: 'Call Forwarding Always',
    path: 'call-forwarding-always',
    services: ['Call Forwarding Always']
  },
  {
    component: UserCallForwardingAlwaysSecondary,
    module: 'Call Forwarding Always Secondary',
    path: 'call-forwarding-always-secondary',
    services: ['Call Forwarding Always Secondary']
  }, 
  {
    component: UserCallForwardingBusy,
    module: 'Call Forwarding Busy',
    path: 'call-forwarding-busy',
    services: ['Call Forwarding Busy']
  },
  {
    component: UserCallForwardingNoAnswer,
    module: 'Call Forwarding No Answer',
    path: 'call-forwarding-no-answer',
    services: ['Call Forwarding No Answer']
  },
  {
    component: UserCallForwardingNotReachable,
    module: 'Call Forwarding Not Reachable',
    path: 'call-forwarding-not-reachable',
    services: ['Call Forwarding Not Reachable']
  },
  {
    angularComponent: 'userCallForwardingSelective',
    module: 'Call Forwarding Selective',
    path: 'call-forwarding-selective',
    services: ['Call Forwarding Selective']
  },
  {
    angularComponent: 'userCallNotify',
    module: 'Call Notify',
    path: 'call-notify',
    services: ['Call Notify']
  },
  {
    angularComponent: 'userCallRecording',
    module: 'Call Recording',
    path: 'call-recording',
    services: ['Call Recording']
  },
  {
    angularComponent: 'userCallTransfer',
    module: 'Call Transfer',
    path: 'call-transfer',
    services: ['Call Transfer']
  },
  {
    angularComponent: 'userCallWaiting',
    module: 'Call Waiting',
    path: 'call-waiting',
    services: ['Call Waiting']
  },
  {
    component: UserCallingLineIdDeliveryBlocking ,
    module: 'Calling Line ID Delivery Blocking',
    path: 'calling-line-id-delivery-blocking',
    services: ['Calling Line ID Delivery Blocking']
  },
  {
    component: UserCallingLineIdDeliveryOverride,
    module: 'Calling Line ID Delivery Override',
    path: 'calling-line-id-delivery-Override',
    services: ['Calling Line ID Delivery Override']
  },
  {
    component: UserCallingNameDelivery,
    module: 'Calling Name Delivery',
    path: 'calling-name-delivery',
    services: ['Calling Name Delivery']
  },
  {
    component: UserCallingNameRetrieval,
    module: 'Calling Name Retrieval',
    path: 'calling-name-retrieval',
    services: ['Calling Name Retrieval']
  },
  {
    angularComponent: 'userCallingNumberDelivery',
    module: 'Calling Number Delivery',
    path: 'calling-number-delivery',
    services: ['Calling Number Delivery']
  },
  {
    angularComponent: 'userCollaborate',
    module: 'Collaborate - Audio',
    path: 'collaborate-audio',
    services: ['Collaborate - Audio']
  },
  {
    angularComponent: 'userConnectedLineIdentificationRestriction',
    module: 'Connected Line Identification Restriction',
    path: 'connected-line-identification-restriction',
    services: ['Connected Line Identification Restriction']
  },
  {
    angularComponent: 'userDirectedCallPickupWithBargeIn',
    module: 'Directed Call Pickup with Barge-in',
    path: 'directed-call-pickup-with-barge-in',
    services: ['Directed Call Pickup with Barge-in']
  },
  {
    angularComponent: 'userDirectory',
    module: 'Directory',
    path: 'directory',
    services: ['Directory']
  },
  {
    angularComponent: 'userDoNotDisturb',
    module: 'Do Not Disturb',
    path: 'do-not-disturb',
    services: ['Do Not Disturb']
  },
  {
    angularComponent: 'userExternalCallingLineIdDelivery',
    module: 'External Calling Line ID Delivery',
    path: 'external-calling-line-id-delivery',
    services: ['External Calling Line ID Delivery']
  },
  {
    angularComponent: 'userFaxMessaging',
    module: 'Fax Messaging',
    path: 'fax-messaging',
    services: ['Fax Messaging']
  },
  {
    angularComponent: 'userFlexibleSeatingGuest',
    module: 'Flexible Seating Guest',
    path: 'flexible-seating-guest',
    services: ['Flexible Seating Guest']
  },
  {
    angularComponent: 'userGroupNightForwarding',
    module: 'Group Night Forwarding',
    path: 'group-night-forwarding',
    services: ['Group Night Forwarding']
  },
  {
    angularComponent: 'userHotelingGuest',
    module: 'Hoteling Guest',
    path: 'hoteling-guest',
    services: ['Hoteling Guest']
  },
  {
    angularComponent: 'userHotelingHost',
    module: 'Hoteling Host',
    path: 'hoteling-host',
    services: ['Hoteling Host']
  },
  {
    angularComponent: 'userIntegratedImp',
    module: 'Integrated IMP',
    path: 'integrated-imp',
    services: ['Integrated IMP']
  },
  {
    angularComponent: 'userInternalCallingLineIdDelivery',
    module: 'Internal Calling Line ID Delivery',
    path: 'internal-calling-line-id-delivery',
    services: ['Internal Calling Line ID Delivery']
  },
  {
    angularComponent: 'userMeetMeConferencing',
    module: 'Meet-Me Conferencing',
    path: 'meet-me-conferencing',
    services: ['Meet-Me Conferencing']
  },
  {
    angularComponent: 'userMusicOnHold',
    module: 'Music On Hold User',
    path: 'music-on-hold-user',
    services: ['Music On Hold User']
  },
  {
    angularComponent: 'userOutlookIntegration',
    module: 'Outlook Integration',
    path: 'outlook-integration',
    services: ['Outlook Integration']
  },
  {
    angularComponent: 'userPriorityAlert',
    module: 'Priority Alert',
    path: 'priority-alert',
    services: ['Priority Alert']
  },
  {
    angularComponent: 'userPrivacy',
    module: 'Privacy',
    path: 'privacy',
    services: ['Privacy']
  },
  {
    angularComponent: 'userPushToTalk',
    module: 'Push to Talk',
    path: 'push-to-talk',
    services: ['Push to Talk']
  },
  {
    angularComponent: 'userRemoteOffice',
    module: 'Remote Office',
    path: 'remote-office',
    services: ['Remote Office']
  },
  {
    angularComponent: 'userSelectiveCallAcceptance',
    module: 'Selective Call Acceptance',
    path: 'selective-call-acceptance',
    services: ['Selective Call Acceptance']
  },
  {
    angularComponent: 'userSelectiveCallRejection',
    module: 'Selective Call Rejection',
    path: 'selective-call-rejection',
    services: ['Selective Call Rejection']
  },
  {
    angularComponent: 'userSequentialRing',
    module: 'Sequential Ring',
    path: 'sequential-ring',
    services: ['Sequential Ring']
  },
  {
    angularComponent: 'userSimultaneousRingPersonal',
    module: 'Simultaneous Ring Personal',
    path: 'simultaneous-ring-personal',
    services: ['Simultaneous Ring Personal']
  },
  {
    angularComponent: 'userSpeedDial100',
    module: 'Speed Dial 100',
    path: 'speed-dial-100',
    services: ['Speed Dial 100']
  },
  {
    component: UserSpeedDial8,
    module: 'Speed Dial 8',
    path: 'speed-dial-8',
    services: ['Speed Dial 8']
  },
  {
    component: UserIntercept,
    module: 'Intercept User',
    path: 'user-intercept',
    services: ['Intercept User']
  },
  {
    angularComponent: 'userVoiceMessagingDashboard',
    module: 'Voice Messaging User',
    path: 'voice-messaging-user',
    services: ['Voice Messaging User']
  }
]

/*
{
  angularComponent: 'userSharedCallAppearance',
  module: 'Shared Call Appearance',
  path: 'shared-call-appearance',
  services: [
    'Shared Call Appearance',
    'Shared Call Appearance 5',
    'Shared Call Appearance 10',
    'Shared Call Appearance 15',
    'Shared Call Appearance 20',
    'Shared Call Appearance 25',
    'Shared Call Appearance 30',
    'Shared Call Appearance 35'
  ]
}
*/
