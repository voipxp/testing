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
      path: 'networkClassOfServices/:name',
      component: 'systemNetworkClassOfService',
      acl: 'System'
    }
  ]

  angular.module('odin.system', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set('/system', routes)
  })
})()
