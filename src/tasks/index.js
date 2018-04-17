;(function() {
  var routes = [
    {
      path: null,
      component: 'odinTasks',
      acl: 'Provisioning'
    }
  ]
  angular.module('odin.tasks', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set('/tasks', routes)
  })
})()
