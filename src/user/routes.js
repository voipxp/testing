export default [
  {
    path: '/users/:serviceProviderId/:groupId/:userId',
    component: 'userDashboard',
    acl: 'User'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/dashboard',
    component: 'userDashboardOld',
    acl: 'User'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/profile',
    component: 'userProfileIndex',
    acl: 'User'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/premiumCallRecords',
    component: 'userCallRecordIndex',
    acl: 'User',
    module: 'Premium Call Records'
  },

  {
    path:
      '/users/:serviceProviderId/:groupId/:userId/sharedCallAppearanceAdmin',
    component: 'userSharedCallAppearanceAdminIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/services',
    component: 'userServicesIndex',
    acl: 'Group',
    module: 'Provisioning',
    bindings: {
      serviceType: 'userServices'
    }
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/servicePacks',
    component: 'userServicesIndex',
    acl: 'Group',
    module: 'Provisioning',
    bindings: {
      serviceType: 'servicePackServices'
    }
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/callingPlans',
    component: 'userCallingPlans',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/callingPlans/incoming',
    component: 'userIncomingCallingPlanIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/callingPlans/outgoing',
    component: 'userOutgoingCallingPlanIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/callingPlans/codes',
    component: 'userOutgoingCallingPlanAuthorizationCodesIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/callingPlans/digitPlan',
    component: 'userOutgoingCallingPlanDigitPlanIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path:
      '/users/:serviceProviderId/:groupId/:userId/callingPlans/pinholeDigitPlan',
    component: 'userOutgoingCallingPlanPinholeDigitPlanIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/callingPlans/transfer',
    component: 'userOutgoingCallingPlanTransferNumbersIndex',
    acl: 'Group',
    module: 'Provisioning'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/viewablePack',
    component: 'userViewablePack',
    acl: 'Group'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/userNightForwarding',
    component: 'userNightForwardingIndex',
    acl: 'User',
    module: 'Group Night Forwarding'
  },
  {
    path: '/users/:serviceProviderId/:groupId/:userId/privacy',
    component: 'userPrivacyIndex',
    acl: 'User',
    module: 'Privacy'
  }
]
