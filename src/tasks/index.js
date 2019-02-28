;(function() {
  var routes = [
    {
      path: null,
      component: 'odinTasks',
      acl: 'Provisioning-PaasAdmin'
    }
  ]
  angular.module('odin.tasks', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, '/tasks')
  })
})()
