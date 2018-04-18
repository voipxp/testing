;(function() {
  var routes = [
    {
      path: null,
      component: 'userDashboard',
      acl: 'User'
    },
    {
      path: 'profile',
      component: 'userProfileIndex',
      acl: 'User'
    },
    {
      path: 'alternateNumbers',
      component: 'userAlternateNumbers',
      acl: 'User',
      module: 'Alternate Numbers'
    },
    {
      path: 'announcements',
      component: 'userAnnouncementsPage',
      acl: 'User'
    },
    {
      path: 'announcements/:name/:mediaType',
      component: 'userAnnouncementPage',
      acl: 'User'
    },
    {
      path: 'anonymousCallRejection',
      component: 'userAnonymousCallRejection',
      acl: 'User',
      module: 'Anonymous Call Rejection'
    },
    {
      path: 'authentication',
      component: 'userAuthentication',
      acl: 'User',
      module: 'Authentication'
    },
    {
      path: 'automaticCallback',
      component: 'userAutomaticCallback',
      acl: 'User',
      module: 'Automatic Callback'
    },
    {
      path: 'automaticHoldRetrieve',
      component: 'userAutomaticHoldRetrieveIndex',
      acl: 'User',
      module: 'Automatic Hold/Retrieve'
    },
    {
      path: 'bargeInExempt',
      component: 'userBargeInExempt',
      acl: 'User',
      module: 'Barge-in Exempt'
    },
    {
      path: 'basicCallLogs',
      component: 'userBasicCallLogs',
      acl: 'User',
      module: 'Basic Call Logs'
    },
    {
      path: 'premiumCallRecords',
      component: 'userCallRecordIndex',
      acl: 'User',
      module: 'Premium Call Records'
    },
    {
      path: 'premiumCallRecords/:startTime/:endTime',
      component: 'userCallRecordSearch',
      acl: 'User',
      module: 'Premium Call Records'
    },
    {
      path: 'broadWorksAnywhere',
      component: 'userBroadWorksAnywhere',
      acl: 'User',
      module: 'BroadWorks Anywhere'
    },
    {
      path: 'broadWorksMobility',
      component: 'userBroadWorksMobility',
      acl: 'User',
      module: 'BroadWorks Mobility'
    },
    {
      path: 'busyLampField',
      component: 'userBusyLampField',
      acl: 'User',
      module: 'Busy Lamp Field'
    },
    {
      path: 'callCenter',
      component: 'userCallCenter',
      acl: 'User',
      module: 'Call Center'
    },
    {
      path: 'callForwardingAlways',
      component: 'userCallForwardingAlwaysIndex',
      acl: 'User',
      module: 'Call Forwarding Always'
    },
    {
      path: 'callForwardingBusy',
      component: 'userCallForwardingBusyIndex',
      acl: 'User',
      module: 'Call Forwarding Busy'
    },
    {
      path: 'callForwardingNoAnswer',
      component: 'userCallForwardingNoAnswer',
      acl: 'User',
      module: 'Call Forwarding No Answer'
    },
    {
      path: 'callForwardingNotReachable',
      component: 'userCallForwardingNotReachable',
      acl: 'User',
      module: 'Call Forwarding Not Reachable'
    },
    {
      path: 'callForwardingSelective',
      component: 'userCallForwardingSelectiveIndex',
      acl: 'User',
      module: 'Call Forwarding Selective'
    },
    {
      path: 'callNotify',
      component: 'userCallNotify',
      acl: 'User',
      module: 'Call Notify'
    },
    {
      path: 'callRecording',
      component: 'userCallRecording',
      acl: 'User',
      module: 'Call Recording'
    },
    {
      path: 'callTransfer',
      component: 'userCallTranser',
      acl: 'User',
      module: 'Call Transfer'
    },
    {
      path: 'callWaiting',
      component: 'userCallWaiting',
      acl: 'User',
      module: 'Call Waiting'
    },
    {
      path: 'callingLineIdDeliveryBlocking',
      component: 'userCallingLineIdDeliveryBlocking',
      acl: 'User',
      module: 'Calling Line ID Delivery Blocking'
    },
    {
      path: 'callingNameDelivery',
      component: 'userCallingNameDelivery',
      acl: 'User',
      module: 'Calling Name Delivery'
    },
    {
      path: 'callingNameRetrieval',
      component: 'userCallingNameRetrieval',
      acl: 'User',
      module: 'Calling Name Retrieval'
    },
    {
      path: 'callingNumberDelivery',
      component: 'userCallingNumberDelivery',
      acl: 'User',
      module: 'Calling Number Delivery'
    },
    {
      path: 'collaborate',
      component: 'userCollaborate',
      acl: 'User',
      module: 'Collaborate - Audio'
    },
    {
      path: 'meetMe',
      component: 'userMeetMeConferencingConferences',
      acl: 'User',
      module: 'Meet-Me Conferencing'
    },
    {
      path: 'communicationBarringAuthorizationCodes',
      component: 'userCommunicationBarringAuthorizationCodesIndex',
      acl: 'Group',
      module: 'Communication Barring User-Control'
    },
    {
      path: 'connectedLineIdentificationRestriction',
      component: 'userConnectedLineIdentificationRestriction',
      acl: 'User',
      module: 'Connected Line Identification Restriction'
    },
    {
      path: 'directedCallPickupWithBargeIn',
      component: 'userDirectedCallPickupWithBargeIn',
      acl: 'User',
      module: 'Directed Call Pickup with Barge-in'
    },
    {
      path: 'directory',
      component: 'userPhoneDirectory',
      acl: 'User'
    },
    {
      path: 'doNotDisturb',
      component: 'userDoNotDisturb',
      acl: 'User',
      module: 'Do Not Disturb'
    },
    {
      path: 'externalCallingLineIdDelivery',
      component: 'userExternalCallingLineIdDelivery',
      acl: 'User',
      module: 'External Calling Line ID Delivery'
    },
    {
      path: 'faxMessaging',
      component: 'userFaxMessaging',
      acl: 'User',
      module: 'Fax Messaging'
    },
    {
      path: 'hotelingGuest',
      component: 'userHotelingGuest',
      acl: 'User',
      module: 'Hoteling Guest'
    },
    {
      path: 'hotelingHost',
      component: 'userHotelingHost',
      acl: 'User',
      module: 'Hoteling Host'
    },
    {
      path: 'internalCallingLineIdDelivery',
      component: 'userInternalCallingLineIdDelivery',
      acl: 'User',
      module: 'Internal Calling Line ID Delivery'
    },
    {
      path: 'musicOnHold',
      component: 'userMusicOnHold',
      acl: 'User',
      module: 'Music On Hold User'
    },
    {
      path: 'outlookIntegration',
      component: 'userOutlookIntegration',
      acl: 'User',
      module: 'Outlook Integration'
    },
    {
      path: 'priorityAlert',
      component: 'userPriorityAlertIndex',
      acl: 'User',
      module: 'Priority Alert'
    },
    {
      path: 'pushToTalk',
      component: 'userPushToTalk',
      acl: 'User',
      module: 'Push To Talk'
    },
    {
      path: 'remoteOffice',
      component: 'userRemoteOffice',
      acl: 'User',
      module: 'Remote Office'
    },
    {
      path: 'selectiveCallAcceptance',
      component: 'userSelectiveCallAcceptance',
      acl: 'User',
      module: 'Selective Call Acceptance'
    },
    {
      path: 'selectiveCallRejection',
      component: 'userSelectiveCallRejection',
      acl: 'User',
      module: 'Selective Call Rejection'
    },
    {
      path: 'sharedCallAppearance',
      component: 'userSharedCallAppearance',
      acl: 'User',
      module: 'Shared Call Appearance'
    },
    {
      path: 'sequentialRing',
      component: 'userSequentialRing',
      acl: 'User',
      module: 'Sequential Ring'
    },
    {
      path: 'simultaneousRingPersonal',
      component: 'userSimultaneousRingPersonal',
      acl: 'User',
      module: 'Simultaneous Ring Personal'
    },
    {
      path: 'speedDial100',
      component: 'userSpeedDial100',
      acl: 'User',
      module: 'Speed Dial 100'
    },
    {
      path: 'voiceMessaging',
      component: 'userVoiceMessagingNavigation',
      acl: 'User',
      module: 'Voice Messaging User'
    },
    {
      path: 'userId',
      component: 'userId',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'delete',
      component: 'userDelete',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'addresses',
      component: 'userAddresses',
      acl: 'Group'
    },
    {
      path: 'sharedCallAppearanceAdmin',
      component: 'userSharedCallAppearanceAdmin',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'services',
      component: 'userServicesIndex',
      acl: 'Group',
      module: 'Provisioning',
      bindings: {
        serviceType: 'userServices'
      }
    },
    {
      path: 'servicePacks',
      component: 'userServicesIndex',
      acl: 'Group',
      module: 'Provisioning',
      bindings: {
        serviceType: 'servicePackServices'
      }
    },
    {
      path: 'callingPlans',
      component: 'userCallingPlans',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/incoming',
      component: 'userIncomingCallingPlanIndex',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/outgoing',
      component: 'userOutgoingCallingPlan',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/code',
      component: 'userOutgoingCallingPlanAuthorizationCode',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/digitPlan',
      component: 'userOutgoingCallingPlanDigitPlan',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/pinholeDigitPlan',
      component: 'userOutgoingCallingPlanPinholeDigitPlan',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/transfer',
      component: 'userOutgoingCallingPlanTransferNumbers',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'viewablePack',
      component: 'userViewablePack',
      acl: 'Group'
    }
  ]

  angular.module('odin.user', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/users/:serviceProviderId/:groupId/:userId')
  })
})()
