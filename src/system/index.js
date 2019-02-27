;(function() {
  var routes = [
    {
      path: null,
      component: 'systemDashboard',
      acl: 'Provisioning'
    },
    {
      path: 'devices',
      component: 'systemDevices',
      acl: 'System'
    },
    {
      path: 'licensing',
      component: 'systemLicensing',
      acl: 'System'
    },
    {
      path: 'dn',
      component: 'systemDn',
      acl: 'Provisioning'
    },
    {
      path: 'collaborate',
      component: 'systemCollaborate',
      acl: 'System'
    },
    {
      path: 'networkClassOfServices',
      component: 'systemNetworkClassOfServices',
      acl: 'System'
    },
    {
      path: 'networkClassOfServices/networkClassOfService',
      component: 'systemNetworkClassOfService',
      acl: 'System'
    },
    {
      path: 'serviceProvidersReport',
      component: 'serviceProviderReport',
      acl: 'Provisioning',
      module: 'User Report'
    }
  ]

  angular.module('odin.system', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/system')
    PbsRouteProvider.set(
      {
        path: 'serviceProviders',
        component: 'serviceProvidersIndex',
        acl: 'Provisioning'
      },
      null
    )
  })
})()
