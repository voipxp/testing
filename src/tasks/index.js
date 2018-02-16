;(function() {
  angular.module('odin.tasks', [])

  angular.module('odin.tasks').config(function routeConfig($routeProvider) {
    $routeProvider.when('/tasks', {
      template: '<odin-tasks></odin-tasks>',
      resolve: {
        _acl: function(ACL) {
          return ACL.allow('Provisioning')
        }
      }
    })
  })
})()
