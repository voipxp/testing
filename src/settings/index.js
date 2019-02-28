;(function() {
  var routes = [
    {
      path: null,
      component: 'odinSettings',
      acl: 'Provisioning-PaasAdmin'
    }
  ]
  angular
    .module('odin.settings', ['checklist-model'])
    .config(function(PbsRouteProvider) {
      PbsRouteProvider.set(routes, '/settings')
    })
})()
