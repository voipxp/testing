;(function() {
  var routes = [
    {
      path: 'UI/tables',
      component: 'pbsDataTableExample'
    }
  ]
  angular.module('odin.UI', ['hc.marked']).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes)
  })
})()
