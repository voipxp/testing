;(function() {
  angular.module('odin.settings', ['checklist-model'])

  angular.module('odin.settings').config(function routeConfig($routeProvider) {
    $routeProvider.when('/settings', {
      template: '<odin-settings></odin-settings>',
      resolve: {
        _acl: function(ACL) {
          return ACL.allow('Provisioning')
        }
      }
    })
  })
})()
