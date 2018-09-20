;(function() {
  var routes = [
    {
      path: null,
      component: 'groupDashboard',
      acl: 'Group'
    },
    {
      path: 'profile',
      component: 'groupProfile',
      acl: 'Group'
    },
    {
      path: 'admins',
      component: 'groupAdmins',
      acl: 'Group'
    },
    {
      path: 'devices',
      component: 'groupDevices',
      acl: 'Group'
    },
    {
      path: 'deviceTypes',
      component: 'groupDeviceTypes',
      acl: 'Group'
    },
    {
      path: 'deviceTypes/:deviceType',
      component: 'groupDeviceType',
      acl: 'Group'
    },
    {
      path: 'directory',
      component: 'groupPhoneDirectory',
      acl: 'Group'
    },
    {
      path: 'phoneList',
      component: 'groupPhoneList',
      acl: 'Group'
    },
    {
      path: 'users',
      component: 'groupUsers',
      acl: 'Group'
    },
    {
      path: 'announcements',
      component: 'groupAnnouncements',
      acl: 'Group'
    },
    {
      path: 'announcements/:name*/:mediaType',
      component: 'groupAnnouncement',
      acl: 'Group'
    },
    {
      path: 'callingPlans',
      component: 'groupCallingPlans',
      acl: 'Group',
      module: 'Group Calling Plans'
    },
    {
      path: 'callingPlans/incoming',
      component: 'groupIncomingCallingPlan',
      acl: 'Group'
    },
    {
      path: 'callingPlans/outgoing',
      component: 'groupOutgoingCallingPlan',
      acl: 'Group'
    },
    {
      path: 'callingPlans/outgoing/users',
      component: 'groupOutgoingCallingPlanUsers',
      acl: 'Group'
    },
    {
      path: 'callingPlans/digitPlan',
      component: 'groupOutgoingCallingPlanDigitPlan',
      acl: 'Group'
    },
    {
      path: 'callingPlans/pinholeDigitPlan',
      component: 'groupOutgoingCallingPlanPinholeDigitPlan',
      acl: 'Group'
    },
    {
      path: 'callingPlans/codes',
      component: 'groupOutgoingCallingPlanAuthorizationCodes',
      acl: 'Group'
    },
    {
      path: 'callingPlans/transfer',
      component: 'groupOutgoingCallingPlanTransferNumbers',
      acl: 'Group'
    },
    {
      path: 'callingPlans/digitPatterns',
      component: 'groupCallingPlanDigitPatterns',
      acl: 'Group'
    },
    {
      path: 'callingPlans/pinholeDigitPatterns',
      component: 'groupOutgoingCallingPlanPinholeDigitPatterns',
      acl: 'Group'
    },
    {
      path: 'collaborate',
      component: 'groupCollaborate',
      acl: 'Group'
    },
    {
      path: 'collaborate/:serviceUserId',
      component: 'groupCollaborateInstance',
      acl: 'Group'
    },
    {
      path: 'anonymousCallRejection',
      component: 'groupAnonymousCallRejection',
      acl: 'Group'
    },
    {
      path: 'automaticCallback',
      component: 'groupAutomaticCallback',
      acl: 'Group'
    },
    {
      path: 'callForwardingAlways',
      component: 'groupCallForwardingAlways',
      acl: 'Group'
    },
    {
      path: 'callForwardingBusy',
      component: 'groupCallForwardingBusy',
      acl: 'Group'
    },
    {
      path: 'callForwardingNoAnswer',
      component: 'groupCallForwardingNoAnswer',
      acl: 'Group'
    },
    {
      path: 'callForwardingNotReachable',
      component: 'groupCallForwardingNotReachable',
      acl: 'Group'
    },
    {
      path: 'callingLineIdDeliveryBlocking',
      component: 'groupCallingLineIdDeliveryBlocking',
      acl: 'Group'
    },
    {
      path: 'callRecording',
      component: 'groupCallRecording',
      acl: 'Group'
    },
    {
      path: 'hotelingGuest',
      component: 'groupHotelingGuest',
      acl: 'Group'
    },
    {
      path: 'hotelingHost',
      component: 'groupHotelingHost',
      acl: 'Group'
    },
    {
      path: 'voiceMessagingUser',
      component: 'groupVoiceMessagingUser',
      acl: 'Group'
    },
    {
      path: 'departments',
      component: 'groupDepartments',
      acl: 'Group'
    },
    {
      path: 'departments/department',
      component: 'groupDepartment',
      reloadOnSearch: true,
      acl: 'Group'
    },
    {
      path: 'groupCommunicationBarringAuthorizationCodes',
      component: 'groupCommunicationBarringAuthorizationCodes',
      acl: 'Group'
    },
    {
      path: 'customContactDirectories',
      component: 'groupCustomContactDirectories',
      acl: 'Group'
    },
    {
      path: 'autoAttendants',
      component: 'autoAttendants',
      acl: 'Group',
      module: 'Auto Attendant'
    },
    {
      path: 'autoAttendants/:serviceUserId',
      component: 'autoAttendant',
      acl: 'Group',
      module: 'Auto Attendant'
    },
    {
      path: 'autoAttendants/:serviceUserId/submenus',
      component: 'groupAutoAttendantSubmenusIndex',
      acl: 'Group',
      module: 'Auto Attendant'
    },
    {
      path: 'autoAttendants/:serviceUserId/:submenuId',
      component: 'groupAutoAttendantSubmenu',
      acl: 'Group',
      module: 'Auto Attendant'
    },
    {
      path: 'callPickup',
      component: 'groupCallPickups',
      acl: 'Group',
      module: 'Call Pickup'
    },
    {
      path: 'callPickup/group',
      reloadOnSearch: true,
      component: 'groupCallPickup',
      acl: 'Group',
      module: 'Call Pickup'
    },
    {
      path: 'callPark',
      component: 'groupCallPark',
      acl: 'Group',
      module: 'Call Park'
    },
    {
      path: 'callPark/group',
      reloadOnSearch: true,
      component: 'groupCallParkGroup',
      acl: 'Group',
      module: 'Call Park'
    },
    {
      path: 'enterpriseTrunks',
      component: 'groupEnterpriseTrunks',
      acl: 'Group',
      module: 'Trunk Group'
    },
    {
      path: 'enterpriseTrunks/:trunkName',
      component: 'groupEnterpriseTrunk',
      acl: 'Group',
      module: 'Trunk Group'
    },
    {
      path: 'trunkGroups',
      component: 'groupTrunkGroups',
      acl: 'Group',
      module: 'Trunk Group'
    },
    {
      path: 'trunkGroups/:trunkName',
      component: 'groupTrunkGroup',
      acl: 'Group',
      module: 'Trunk Group'
    },
    {
      path: 'paging',
      component: 'groupPagingGroups',
      acl: 'Group',
      module: 'Group Paging'
    },
    {
      path: 'paging/:serviceUserId',
      component: 'groupPagingGroup',
      acl: 'Group',
      module: 'Group Paging'
    },
    {
      path: 'huntGroups',
      component: 'groupHuntGroups',
      acl: 'Group',
      module: 'Hunt Group'
    },
    {
      path: 'huntGroups/:serviceUserId',
      component: 'groupHuntGroup',
      acl: 'Group',
      module: 'Hunt Group'
    },
    {
      path: 'meetMe',
      component: 'groupMeetMe',
      acl: 'Group',
      module: 'Meet-Me Conferencing'
    },
    {
      path: 'meetMe/:serviceUserId',
      component: 'meetMeBridge',
      acl: 'Group',
      module: 'Meet-Me Conferencing'
    },
    {
      path: 'musicOnHold',
      component: 'groupMusicOnHoldIndex',
      acl: 'Group',
      module: 'Music On Hold'
    },
    {
      path: 'musicOnHold/:departmentId',
      component: 'groupMusicOnHold',
      acl: 'Group',
      module: 'Music On Hold'
    },
    {
      path: 'voiceMessaging',
      component: 'groupVoiceMessaging',
      acl: 'Group',
      module: 'Voice Messaging Group'
    },
    {
      path: 'callRecords/autoAttendant',
      component: 'autoAttendantCallRecords',
      acl: 'Group',
      module: 'Auto Attendant Report'
    },
    {
      path: 'callRecords/callCenter',
      component: 'groupCallCenterCallRecords',
      acl: 'Group',
      module: 'Premium Call Records'
    },
    {
      path: 'callRecords/userCallReport',
      component: 'groupUserCallReportIndex',
      acl: 'Group',
      module: 'Premium Call Records'
    },
    {
      path: 'callRecords/group',
      component: 'groupCallRecordIndex',
      acl: 'Group',
      module: 'Premium Call Records'
    },
    {
      path: 'callRecords/group/:startTime/:endTime',
      component: 'groupCallRecordSearch',
      acl: 'Group',
      module: 'Premium Call Records'
    },
    {
      path: 'reports/users',
      component: 'usersReport',
      acl: 'Group',
      module: 'User Report'
    },
    {
      path: 'callCenters',
      component: 'groupCallCenters',
      acl: 'Group',
      module: 'Call Center'
    },
    {
      path: 'callCenters/:serviceUserId',
      component: 'groupCallCenter',
      acl: 'Group',
      module: 'Call Center'
    },
    {
      path: 'callCenters/:serviceUserId/:dnisId',
      component: 'groupCallCenterDnisInstance',
      acl: 'Group',
      module: 'Call Center'
    },
    {
      path: 'schedules',
      component: 'groupSchedules',
      acl: 'Group'
    },
    {
      path: 'schedules/schedule',
      reloadOnSearch: true,
      component: 'groupSchedule',
      acl: 'Group'
    },
    {
      path: 'viewablePacks',
      component: 'groupViewablePacksIndex',
      acl: 'Group',
      module: 'Viewable Service Packs'
    },
    {
      path: 'services/group',
      component: 'groupServices',
      acl: 'Service Provider',
      bindings: {
        serviceType: 'groupServices'
      }
    },
    {
      path: 'services/user',
      component: 'groupServices',
      acl: 'Service Provider',
      bindings: {
        serviceType: 'userServices'
      }
    },
    {
      path: 'services/servicePack',
      component: 'groupServices',
      acl: 'Service Provider',
      bindings: {
        serviceType: 'servicePackServices'
      }
    },
    {
      path: 'numbers',
      component: 'groupNumbers',
      acl: 'Service Provider'
    },
    {
      path: 'delete',
      component: 'groupDelete',
      acl: 'Service Provider'
    },
    {
      path: 'networkclassofservices',
      component: 'groupNetworkClassOfServices',
      acl: 'Group'
    },
    {
      path: 'callProcessingPolicy',
      component: 'groupCallProcessingPolicy',
      acl: 'Group'
    },
    {
      path: 'intercept',
      component: 'groupIntercept',
      acl: 'Group',
      module: 'Intercept Group'
    },
    {
      path: 'routingProfile',
      component: 'groupRoutingProfile',
      acl: 'Group',
      module: 'Routing Profile'
    },
    {
      path: 'featureAccessCodes',
      component: 'groupFeatureAccessCodes',
      acl: 'Group',
      module: 'Group Feature Access Codes'
    },
    {
      path: 'nightForwarding',
      component: 'groupNightForwarding',
      acl: 'Group',
      module: 'Group Night Forwarding'
    },
    {
      path: 'virtualOnNetEnterpriseExtensions',
      component: 'groupVirtualOnNetEnterpriseExtensions',
      acl: 'Group',
      module: 'Virtual On-Net Enterprise Extensions'
    }
  ]

  angular.module('odin.group', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/groups/:serviceProviderId/:groupId')
  })
})()
