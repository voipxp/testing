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
      component: 'serviceProviderGroups',
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
      path: 'enterpriseTrunks/:trunkName',
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
      acl: 'Provisioning'
    },
    {
      path: 'devices',
      component: 'serviceProviderDevices',
      acl: 'Provisioning'
    },
    {
      path: 'userServices',
      component: 'serviceProviderServices',
      acl: 'Provisioning',
      bindings: {
        serviceType: 'userServices'
      }
    },
    {
      path: 'groupServices',
      component: 'serviceProviderServices',
      acl: 'Provisioning',
      bindings: {
        serviceType: 'groupServices'
      }
    },
    {
      path: 'servicePacks',
      component: 'serviceProviderServicePacks',
      acl: 'Provisioning'
    },
    {
      path: 'servicePacks/:servicePackName',
      component: 'serviceProviderServicePack',
      acl: 'Provisioning'
    },
    {
      path: 'delete',
      component: 'serviceProviderDelete',
      acl: 'Provisioning'
    },
    {
      path: 'networkClassOfServices',
      component: 'serviceProviderNetworkClassOfServices',
      acl: 'Service Provider'
    }
  ]

  angular.module('odin.serviceProvider', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set('/serviceProviders/:serviceProviderId', routes)
  })
})()
