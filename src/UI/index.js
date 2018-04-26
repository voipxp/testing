;(function() {
  var routes = [
    {
      component: 'pbsDoc'
    },
    {
      path: 'pbsDataTable',
      component: 'pbsDataTableDoc'
    }
  ]
  angular.module('odin.UI', ['hc.marked']).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes, 'UI')
  })
})()
