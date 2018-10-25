;(function() {
  var routes = [
    {
      path: null,
      component: 'systemDashboard',
      acl: 'System'
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
      acl: 'System'
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
      acl: 'System',
      module: 'User Report'
    }
  ]

  angular.module('odin.system', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/system')
  })
})()
