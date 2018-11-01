;(function() {
  var routes = [
    {
      path: '/events',
      component: 'odinEvents',
      acl: 'Provisioning'
    },
    {
      path: '/events/logins',
      component: 'odinUserLoginIndex',
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
