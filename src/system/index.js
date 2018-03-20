;(function() {
  function acl(ACL) {
    return ACL.allow('System')
  }

  angular.module('odin.system', [])

  angular.module('odin.system').config(function routeConfig($routeProvider) {
    $routeProvider
      .when('/system', {
        template: '<system-dashboard></system-dashboard>',
        resolve: { acl: acl }
      })
      .when('/system/devices', {
        template: '<system-devices></system-devices>',
        resolve: { acl: acl },
        reloadOnSearch: false
      })
      .when('/system/licensing', {
        template: '<system-licensing></system-licensing>',
        resolve: { acl: acl },
        reloadOnSearch: false
      })
      .when('/system/dn', {
        template: '<system-dn></system-dn>',
        resolve: { acl: acl },
        reloadOnSearch: false
      })
      .when('/system/collaborate', {
        template: '<system-collaborate></system-collaborate>',
        resolve: { acl: acl },
        reloadOnSearch: false
      })
      .when('/system/networkClassOfServices', {
        template:
          '<system-network-class-of-services></system-network-class-of-services>',
        resolve: { acl: acl }
      })
      .when('/system/networkClassOfServices/:name', {
        template:
          '<system-network-class-of-service></system-network-class-of-service>',
        resolve: { acl: acl }
      })
  })
})()
