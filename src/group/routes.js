export default [
  {
    path: '/groups/:serviceProviderId/:groupId',
    component: 'groupDashboard',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/profile',
    component: 'groupProfile',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/admins',
    component: 'groupAdmins',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/devices',
    component: 'groupDevices',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/deviceTypes',
    component: 'groupDeviceTypes',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/deviceTypes/deviceType',
    component: 'groupDeviceType',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/directory',
    component: 'groupPhoneDirectory',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/phoneList',
    component: 'groupCommonPhoneList',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/users',
    component: 'groupUsers',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/announcements',
    component: 'groupAnnouncements',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/announcements/announcement',
    component: 'groupAnnouncement',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans',
    component: 'groupCallingPlans',
    acl: 'Group',
    module: 'Group Calling Plans'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/incoming',
    component: 'groupIncomingCallingPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/outgoing',
    component: 'groupOutgoingCallingPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/outgoing/users',
    component: 'groupOutgoingCallingPlanUsers',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/digitPlan',
    component: 'groupOutgoingCallingPlanDigitPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/pinholeDigitPlan',
    component: 'groupOutgoingCallingPlanPinholeDigitPlan',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/codes',
    component: 'groupOutgoingCallingPlanAuthorizationCodes',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/transfer',
    component: 'groupOutgoingCallingPlanTransferNumbers',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingPlans/digitPatterns',
    component: 'groupCallingPlanDigitPatterns',
    acl: 'Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/callingPlans/pinholeDigitPatterns',
    component: 'groupOutgoingCallingPlanPinholeDigitPatterns',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/collaborate',
    component: 'groupCollaborate',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/collaborate/bridge',
    component: 'groupCollaborateBridge',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/anonymousCallRejection',
    component: 'groupAnonymousCallRejection',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/automaticCallback',
    component: 'groupAutomaticCallback',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingAlways',
    component: 'groupCallForwardingAlways',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingBusy',
    component: 'groupCallForwardingBusy',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingNoAnswer',
    component: 'groupCallForwardingNoAnswer',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callForwardingNotReachable',
    component: 'groupCallForwardingNotReachable',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callingLineIdDeliveryBlocking',
    component: 'groupCallingLineIdDeliveryBlocking',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecording',
    component: 'groupCallRecording',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/hotelingGuest',
    component: 'groupHotelingGuest',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/hotelingHost',
    component: 'groupHotelingHost',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/voiceMessagingUser',
    component: 'groupVoiceMessagingUser',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/departments',
    component: 'groupDepartments',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/departments/department',
    component: 'groupDepartment',
    acl: 'Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/groupCommunicationBarringAuthorizationCodes',
    component: 'groupCommunicationBarringAuthorizationCodes',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/customContactDirectories',
    component: 'groupCustomContactDirectories',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants',
    component: 'autoAttendants',
    acl: 'Group',
    module: 'Auto Attendant'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/autoAttendants/autoAttendant',
    component: 'autoAttendant',
    acl: 'Group',
    module: 'Auto Attendant'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPickup',
    component: 'groupCallPickups',
    acl: 'Group',
    module: 'Call Pickup'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPickup/group',
    component: 'groupCallPickup',
    acl: 'Group',
    module: 'Call Pickup'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPark',
    component: 'groupCallPark',
    acl: 'Group',
    module: 'Call Park'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callPark/group',
    component: 'groupCallParkGroup',
    acl: 'Group',
    module: 'Call Park'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/enterpriseTrunks',
    component: 'groupEnterpriseTrunks',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/enterpriseTrunks/enterpriseTrunk',
    component: 'groupEnterpriseTrunk',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/trunkGroups',
    component: 'groupTrunkGroups',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/trunkGroups/trunkGroup',
    component: 'groupTrunkGroup',
    acl: 'Group',
    module: 'Trunk Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/paging',
    component: 'groupPagingGroups',
    acl: 'Group',
    module: 'Group Paging'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/paging/group',
    component: 'groupPagingGroup',
    acl: 'Group',
    module: 'Group Paging'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/huntGroups',
    component: 'groupHuntGroups',
    acl: 'Group',
    module: 'Hunt Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/huntGroups/huntGroup',
    component: 'groupHuntGroup',
    acl: 'Group',
    module: 'Hunt Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/meetMe',
    component: 'groupMeetMe',
    acl: 'Group',
    module: 'Meet-Me Conferencing'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/meetMe/bridge',
    component: 'meetMeBridge',
    acl: 'Group',
    module: 'Meet-Me Conferencing'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/musicOnHold',
    component: 'groupMusicOnHoldIndex',
    acl: 'Group',
    module: 'Music On Hold'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/musicOnHold/instance',
    component: 'groupMusicOnHold',
    acl: 'Group',
    module: 'Music On Hold'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/voiceMessaging',
    component: 'groupVoiceMessaging',
    acl: 'Group',
    module: 'Voice Messaging Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/autoAttendant',
    component: 'autoAttendantCallRecords',
    acl: 'Group',
    module: 'Auto Attendant Report'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/callCenter',
    component: 'groupCallCenterCallRecords',
    acl: 'Group',
    module: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/userCallReport',
    component: 'groupUserCallReportIndex',
    acl: 'Group',
    module: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callRecords/group',
    component: 'groupCallRecordIndex',
    acl: 'Group',
    module: 'Premium Call Records'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/reports/users',
    component: 'usersReport',
    acl: 'Group',
    module: 'User Report'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callCenters',
    component: 'groupCallCenters',
    acl: 'Group',
    module: 'Call Center'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callCenters/callCenter',
    component: 'groupCallCenter',
    acl: 'Group',
    module: 'Call Center'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/schedules',
    component: 'groupSchedules',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/schedules/schedule',
    component: 'groupSchedule',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/viewablePacks',
    component: 'groupViewablePacksIndex',
    acl: 'Group',
    module: 'Viewable Service Packs'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/group',
    component: 'groupServices',
    acl: 'Service Provider',
    bindings: {
      serviceType: 'groupServices'
    }
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/user',
    component: 'groupServices',
    acl: 'Service Provider',
    bindings: {
      serviceType: 'userServices'
    }
  },
  {
    path: '/groups/:serviceProviderId/:groupId/services/servicePack',
    component: 'groupServices',
    acl: 'Service Provider',
    bindings: {
      serviceType: 'servicePackServices'
    }
  },
  {
    path: '/groups/:serviceProviderId/:groupId/numbers',
    component: 'groupNumbers',
    acl: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/delete',
    component: 'groupDelete',
    acl: 'Service Provider'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/networkclassofservices',
    component: 'groupNetworkClassOfServices',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/callProcessingPolicy',
    component: 'groupCallProcessingPolicy',
    acl: 'Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/intercept',
    component: 'groupIntercept',
    acl: 'Group',
    module: 'Intercept Group'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/routingProfile',
    component: 'groupRoutingProfile',
    acl: 'Group',
    module: 'Routing Profile'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/featureAccessCodes',
    component: 'groupFeatureAccessCodes',
    acl: 'Group',
    module: 'Group Feature Access Codes'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/nightForwarding',
    component: 'groupNightForwarding',
    acl: 'Group',
    module: 'Group Night Forwarding'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/virtualOnNetEnterpriseExtensions',
    component: 'groupVirtualOnNetEnterpriseExtensions',
    acl: 'Group',
    module: 'Virtual On-Net Enterprise Extensions'
  },
  {
    path: '/groups/:serviceProviderId/:groupId/flexibleSeatingHosts',
    component: 'flexibleSeatingHosts',
    acl: 'Group',
    module: 'Flexible Seating Guest'
  },
  {
    path:
      '/groups/:serviceProviderId/:groupId/flexibleSeatingHosts/flexibleSeatingHost',
    component: 'flexibleSeatingHost',
    acl: 'Group',
    module: 'Flexible Seating Guest'
  }
]
