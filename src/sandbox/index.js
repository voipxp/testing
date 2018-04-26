;(function() {
  var routes = [
    {
      path: 'sandbox/tables',
      component: 'pbsTestTables'
    }
  ]
  angular.module('odin.sandbox', []).config(function(PbsRouteProvider) {
    PbsRouteProvider.set(routes)
  })
})()
