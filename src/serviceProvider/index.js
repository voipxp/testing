;(function() {
  var routes = [
    {
      path: null,
      component: 'serviceProviderDashboard',
      acl: 'Service Provider'
    },
    {
      path: 'profile',
      component: 'serviceProviderProfile',
      acl: 'Service Provider'
    },
    {
      path: 'groups',
      component: 'serviceProviderGroupsIndex',
      acl: 'Service Provider'
    },
    {
      path: 'admins',
      component: 'serviceProviderAdmins',
      acl: 'Service Provider'
    },
    {
      path: 'directory',
      component: 'serviceProviderPhoneDirectory',
      acl: 'Service Provider'
    },
    {
      path: 'enterpriseTrunks',
      component: 'enterpriseEnterpriseTrunks',
      acl: 'Service Provider',
      module: 'Trunk Group'
    },
    {
      path: 'enterpriseTrunks/enterpriseTrunk',
      component: 'enterpriseEnterpriseTrunk',
      acl: 'Service Provider',
      module: 'Trunk Group'
    },
    {
      path: 'meetMe',
      component: 'serviceProviderMeetMe',
      acl: 'Service Provider',
      module: 'Meet-Me Conferencing'
    },
    {
      path: 'numbers',
      component: 'serviceProviderNumbers',
      acl: 'Service Provider'
    },
    {
      path: 'devices',
      component: 'serviceProviderDevices',
      acl: 'Provisioning'
    },
    {
      path: 'delete',
      component: 'serviceProviderDelete',
      acl: 'Provisioning'
    },
    {
      path: 'userServices',
      component: 'serviceProviderServices',
      acl: 'Service Provider',
      bindings: {
        serviceType: 'userServices'
      }
    },
    {
      path: 'groupServices',
      component: 'serviceProviderServices',
      acl: 'Service Provider',
      bindings: {
        serviceType: 'groupServices'
      }
    },
    {
      path: 'servicePacks',
      component: 'serviceProviderServicePacks',
      acl: 'Service Provider'
    },
    {
      path: 'servicePacks/servicePack',
      component: 'serviceProviderServicePack',
      acl: 'Service Provider'
    },
    {
      path: 'networkClassOfServices',
      component: 'serviceProviderNetworkClassOfServices',
      acl: 'Service Provider'
    },
    {
      path: 'reports/users',
      component: 'usersReport',
      acl: 'Service Provider',
      module: 'User Report'
    },
    {
      path: 'reports/callCapacity',
      component: 'serviceProviderTrunkGroupsCallCapacityReport',
      acl: 'Service Provider',
      module: 'User Report'
    }
  ]
  angular.module('odin.serviceProvider', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/serviceProviders/:serviceProviderId')
  })
})()
