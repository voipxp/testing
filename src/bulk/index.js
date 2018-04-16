;(function() {
  function acl(ACL) {
    return ACL.allow('Group')
  }

  function module(name) {
    return function(Module) {
      'ngInject'
      return Module.allow(name)
    }
  }

  // Get last selected set of users to inject into component
  function users(BulkUsersService, $q) {
    return BulkUsersService.get().then(function(data) {
      return data.users.length > 0 ? data : $q.reject('routeToSelect')
    })
  }

  angular.module('odin.bulk', [])

  angular
    .module('odin.bulk')
    .config(function routeConfig($routeProvider) {
      $routeProvider
        .when('/bulk', {
          template: '<bulk-dashboard></bulk-dashboard>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/csv', {
          template: '<bulk-csv></bulk-csv>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/tasks', {
          template: '<bulk-tasks-index></bulk-tasks-index>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/tasks/:id', {
          template: '<bulk-task></bulk-task>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/users', {
          template: '<bulk-users></bulk-users>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/import', {
          template: '<bulk-import></bulk-import>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/user.create', {
          template: '<bulk-user-create></bulk-user-create>',
          resolve: { acl: acl, module: module('Provisioning') }
        })
        .when('/bulk/user.delete', {
          template:
            '<bulk-user-delete data="$resolve.data"></bulk-user-delete>',
          resolve: { acl: acl, module: module('Provisioning'), data: users }
        })
        .when('/bulk/user.services.update', {
          template:
            '<bulk-user-services-update data="$resolve.data"></bulk-user-services-update>',
          resolve: { acl: acl, module: module('Provisioning'), data: users }
        })
        .when('/bulk/user.number.update', {
          template:
            '<bulk-user-number-update data="$resolve.data"></bulk-user-number-update>',
          resolve: { acl: acl, module: module('Provisioning'), data: users }
        })
        .when('/bulk/user.sharedcallappearance.update', {
          template:
            '<bulk-user-shared-call-appearance-update data="$resolve.data"></bulk-user-shared-call-appearance-update>',
          resolve: { acl: acl, module: module('Provisioning'), data: users }
        })
        .when('/bulk/user.ucone.update', {
          template:
            '<bulk-user-uc-one-update data="$resolve.data"></bulk-user-uc-one-update>',
          resolve: { acl: acl, module: module('Provisioning'), data: users }
        })
    })
    .run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function(e, c, p, error) {
        if (error === 'routeToSelect') {
          var path = $location
            .path()
            .split('/')
            .pop()
          $location.path('bulk/users').search({ next: path })
        }
      })
    })
})()
