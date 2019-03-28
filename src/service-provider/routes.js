const routes = [
  {
    path: '/serviceProviders/:serviceProviderId',
    component: 'serviceProviderDashboard',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/profile',
    component: 'serviceProviderProfile',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/groups',
    component: 'serviceProviderGroupsIndex',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/admins',
    component: 'serviceProviderAdmins',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/directory',
    component: 'serviceProviderPhoneDirectory',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/enterpriseTrunks',
    component: 'enterpriseEnterpriseTrunks',
    acl: 'Service Provider',
    module: 'Trunk Group'
  },
  {
    path:
      '/serviceProviders/:serviceProviderId/enterpriseTrunks/enterpriseTrunk',
    component: 'enterpriseEnterpriseTrunk',
    acl: 'Service Provider',
    module: 'Trunk Group'
  },
  {
    path: '/serviceProviders/:serviceProviderId/meetMe',
    component: 'serviceProviderMeetMe',
    acl: 'Service Provider',
    module: 'Meet-Me Conferencing'
  },
  {
    path: '/serviceProviders/:serviceProviderId/numbers',
    component: 'serviceProviderNumbers',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/devices',
    component: 'serviceProviderDevices',
    acl: 'Provisioning'
  },
  {
    path: '/serviceProviders/:serviceProviderId/delete',
    component: 'serviceProviderDelete',
    acl: 'Provisioning'
  },
  {
    path: '/serviceProviders/:serviceProviderId/userServices',
    component: 'serviceProviderServices',
    acl: 'Service Provider',
    bindings: {
      serviceType: 'userServices'
    }
  },
  {
    path: '/serviceProviders/:serviceProviderId/groupServices',
    component: 'serviceProviderServices',
    acl: 'Service Provider',
    bindings: {
      serviceType: 'groupServices'
    }
  },
  {
    path: '/serviceProviders/:serviceProviderId/servicePacks',
    component: 'serviceProviderServicePacks',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/servicePacks/servicePack',
    component: 'serviceProviderServicePack',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/networkClassOfServices',
    component: 'serviceProviderNetworkClassOfServices',
    acl: 'Service Provider'
  },
  {
    path: '/serviceProviders/:serviceProviderId/reports/users',
    component: 'usersReport',
    acl: 'Service Provider',
    module: 'User Report'
  },
  {
    path: '/serviceProviders/:serviceProviderId/reports/callCapacity',
    component: 'serviceProviderTrunkGroupsCallCapacityReport',
    acl: 'Service Provider',
    module: 'User Report'
  }
]

export default routes
