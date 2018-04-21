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
      path: 'devicesTypes/:deviceType',
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
      component: 'groupCallaborateInstance',
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
      path: 'departments',
      component: 'groupDepartments',
      acl: 'Group'
    },
    {
      path: 'departments/:name',
      component: 'groupDepartment',
      acl: 'Group'
    },
    {
      path: 'groupCommunicationBarringAuthorizationCodes',
      component: 'groupCommunicationBarringAuthorizationCodes',
      acl: 'Group'
    },
    {
      path: 'customContactDirectory',
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
      path: 'callPickup/:name',
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
      path: 'callPark/:name',
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
      path: 'schedules/:scheduleName/:scheduleType',
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
    }
  ]

  angular.module('odin.group', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/groups/:serviceProviderId/:groupId')
  })
})()
