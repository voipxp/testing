;(function() {
  function acl(ACL) {
    return ACL.allow('Provisioning')
  }

  angular.module('odin.branding', ['mp.colorPicker', 'truncate'])

  angular.module('odin.branding').config(function routeConfig($routeProvider) {
    $routeProvider
      .when('/branding', {
        template: '<branding-hostnames></branding-hostnames>',
        resolve: { acl: acl }
      })
      .when('/branding/:hostnameId', {
        template: '<branding-hostname></branding-hostname>',
        resolve: { acl: acl }
      })
  })
})()
