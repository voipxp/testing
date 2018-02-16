;(function() {
  function acl(ACL) {
    return ACL.allow('Provisioning')
  }

  angular.module('odin.provisioning', ['angularFileInput'])

  angular
    .module('odin.provisioning')
    .config(function routeConfig($routeProvider) {
      $routeProvider
        .when('/provisioning', {
          template: '<provisioning-dashboard></provisioning-dashboard>',
          resolve: {
            acl: acl
          }
        })
        .when('/serviceProviders', {
          template: '<service-providers-index></service-providers-index>',
          resolve: {
            acl: acl
          },
          reloadOnSearch: false
        })
        .when('/queues', {
          template: '<pbs-horizon></pbs-horizon>',
          resolve: {
            acl: acl
          }
        })
    })
})()
