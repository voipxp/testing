;(function() {
  var routes = [
    {
      path: 'provisioning',
      component: 'provisioningDashboard',
      acl: 'Provisioning'
    },
    {
      path: 'serviceProviders',
      component: 'serviceProvidersIndex',
      acl: 'Provisioning'
    },
    {
      path: 'queue',
      component: 'pbsHorizon',
      acl: 'Provisioning'
    }
  ]
  angular.module('odin.provisioning', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes)
  })
})()
