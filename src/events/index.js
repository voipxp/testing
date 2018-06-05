;(function() {
  var routes = [
    {
      path: '/events',
      component: 'odinEvents',
      acl: 'Provisioning'
    },
    {
      path: '/webhooks',
      component: 'odinWebhooks',
      acl: 'Provisioning'
    }
  ]
  angular.module('odin.events', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes)
  })
})()
