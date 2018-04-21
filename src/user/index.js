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
      component: 'userAlternateNumbersIndex',
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
      component: 'userAnonymousCallRejectionIndex',
      acl: 'User',
      module: 'Anonymous Call Rejection'
    },
    {
      path: 'authentication',
      component: 'userAuthenticationIndex',
      acl: 'User',
      module: 'Authentication'
    },
    {
      path: 'automaticCallback',
      component: 'userAutomaticCallbackIndex',
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
      component: 'userBargeInExemptIndex',
      acl: 'User',
      module: 'Barge-in Exempt'
    },
    {
      path: 'basicCallLogs',
      component: 'userBasicCallLogsIndex',
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
      component: 'userBroadWorksAnywhereIndex',
      acl: 'User',
      module: 'BroadWorks Anywhere'
    },
    {
      path: 'broadWorksMobility',
      component: 'userBroadWorksMobilityIndex',
      acl: 'User',
      module: 'BroadWorks Mobility'
    },
    {
      path: 'busyLampField',
      component: 'userBusyLampFieldIndex',
      acl: 'User',
      module: 'Busy Lamp Field'
    },
    {
      path: 'callCenter',
      component: 'userCallCenterIndex',
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
      component: 'userCallForwardingNoAnswerIndex',
      acl: 'User',
      module: 'Call Forwarding No Answer'
    },
    {
      path: 'callForwardingNotReachable',
      component: 'userCallForwardingNotReachableIndex',
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
      component: 'userCallNotifyIndex',
      acl: 'User',
      module: 'Call Notify'
    },
    {
      path: 'callRecording',
      component: 'userCallRecordingIndex',
      acl: 'User',
      module: 'Call Recording'
    },
    {
      path: 'callTransfer',
      component: 'userCallTransferIndex',
      acl: 'User',
      module: 'Call Transfer'
    },
    {
      path: 'callWaiting',
      component: 'userCallWaitingIndex',
      acl: 'User',
      module: 'Call Waiting'
    },
    {
      path: 'callingLineIdDeliveryBlocking',
      component: 'userCallingLineIdDeliveryBlockingIndex',
      acl: 'User',
      module: 'Calling Line ID Delivery Blocking'
    },
    {
      path: 'callingNameDelivery',
      component: 'userCallingNameDeliveryIndex',
      acl: 'User',
      module: 'Calling Name Delivery'
    },
    {
      path: 'callingNameRetrieval',
      component: 'userCallingNameRetrievalIndex',
      acl: 'User',
      module: 'Calling Name Retrieval'
    },
    {
      path: 'callingNumberDelivery',
      component: 'userCallingNumberDeliveryIndex',
      acl: 'User',
      module: 'Calling Number Delivery'
    },
    {
      path: 'collaborate',
      component: 'userCollaborateIndex',
      acl: 'User',
      module: 'Collaborate - Audio'
    },
    {
      path: 'meetMe',
      component: 'userMeetMeConferencingConferencesIndex',
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
      component: 'userConnectedLineIdentificationRestrictionIndex',
      acl: 'User',
      module: 'Connected Line Identification Restriction'
    },
    {
      path: 'directedCallPickupWithBargeIn',
      component: 'userDirectedCallPickupWithBargeInIndex',
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
      component: 'userDoNotDisturbIndex',
      acl: 'User',
      module: 'Do Not Disturb'
    },
    {
      path: 'externalCallingLineIdDelivery',
      component: 'userExternalCallingLineIdDeliveryIndex',
      acl: 'User',
      module: 'External Calling Line ID Delivery'
    },
    {
      path: 'faxMessaging',
      component: 'userFaxMessagingIndex',
      acl: 'User',
      module: 'Fax Messaging'
    },
    {
      path: 'hotelingGuest',
      component: 'userHotelingGuestIndex',
      acl: 'User',
      module: 'Hoteling Guest'
    },
    {
      path: 'hotelingHost',
      component: 'userHotelingHostIndex',
      acl: 'User',
      module: 'Hoteling Host'
    },
    {
      path: 'internalCallingLineIdDelivery',
      component: 'userInternalCallingLineIdDeliveryIndex',
      acl: 'User',
      module: 'Internal Calling Line ID Delivery'
    },
    {
      path: 'musicOnHold',
      component: 'userMusicOnHoldIndex',
      acl: 'User',
      module: 'Music On Hold User'
    },
    {
      path: 'outlookIntegration',
      component: 'userOutlookIntegrationIndex',
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
      component: 'userPushToTalkIndex',
      acl: 'User',
      module: 'Push to Talk'
    },
    {
      path: 'remoteOffice',
      component: 'userRemoteOfficeIndex',
      acl: 'User',
      module: 'Remote Office'
    },
    {
      path: 'selectiveCallAcceptance',
      component: 'userSelectiveCallAcceptanceIndex',
      acl: 'User',
      module: 'Selective Call Acceptance'
    },
    {
      path: 'selectiveCallRejection',
      component: 'userSelectiveCallRejectionIndex',
      acl: 'User',
      module: 'Selective Call Rejection'
    },
    {
      path: 'sharedCallAppearance',
      component: 'userSharedCallAppearanceIndex',
      acl: 'User',
      module: 'Shared Call Appearance'
    },
    {
      path: 'sequentialRing',
      component: 'userSequentialRingIndex',
      acl: 'User',
      module: 'Sequential Ring'
    },
    {
      path: 'simultaneousRingPersonal',
      component: 'userSimultaneousRingPersonalIndex',
      acl: 'User',
      module: 'Simultaneous Ring Personal'
    },
    {
      path: 'speedDial100',
      component: 'userSpeedDial100Index',
      acl: 'User',
      module: 'Speed Dial 100'
    },
    {
      path: 'voiceMessaging',
      component: 'userVoiceMessagingIndex',
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
      component: 'userSharedCallAppearanceAdminIndex',
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
      component: 'userOutgoingCallingPlanIndex',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/codes',
      component: 'userOutgoingCallingPlanAuthorizationCodesIndex',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/digitPlan',
      component: 'userOutgoingCallingPlanDigitPlanIndex',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/pinholeDigitPlan',
      component: 'userOutgoingCallingPlanPinholeDigitPlanIndex',
      acl: 'Group',
      module: 'Provisioning'
    },
    {
      path: 'callingPlans/transfer',
      component: 'userOutgoingCallingPlanTransferNumbersIndex',
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
