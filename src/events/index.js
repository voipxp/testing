;(function() {
  var routes = [
    {
      path: null,
      component: 'odinEvents',
      acl: 'Provisioning'
    }
  ]
  angular.module('odin.events', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/events')
  })
})()
