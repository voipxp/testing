;(function() {
  angular.module('odin.events', [])

  angular.module('odin.events').config(function routeConfig($routeProvider) {
    $routeProvider.when('/events', {
      template: '<odin-events></odin-events>',
      resolve: {
        _acl: function(ACL) {
          return ACL.allow('Provisioning')
        }
      }
    })
  })
})()
