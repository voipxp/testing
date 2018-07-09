;(function() {
  // Get last selected set of users to inject into component
  function data(BulkUsersService, $q) {
    return BulkUsersService.get().then(function(data) {
      return data.users.length > 0 ? data : $q.reject('routeToSelect')
    })
  }

  var routes = [
    {
      path: null,
      component: 'bulkDashboard'
    },
    {
      path: 'csv',
      component: 'bulkCsv'
    },
    {
      path: 'tasks',
      component: 'bulkTasksIndex'
    },
    {
      path: 'tasks/:id',
      component: 'bulkTask'
    },
    {
      path: 'users',
      component: 'bulkUsers'
    },
    {
      path: 'import',
      component: 'bulkImport'
    },
    {
      path: 'user.create',
      component: 'bulkUserCreate'
    },
    {
      path: 'user.delete',
      component: 'bulkUserDelete',
      resolve: { data: data }
    },
    {
      path: 'user.services.update',
      component: 'bulkUserServicesUpdate',
      resolve: { data: data }
    },
    {
      path: 'user.number.update',
      component: 'bulkUserNumberUpdate',
      resolve: { data: data }
    },
    {
      path: 'user.sharedcallappearance.update',
      component: 'bulkUserSharedCallAppearanceUpdate',
      resolve: { data: data }
    },
    {
      path: 'user.ucone.update',
      component: 'bulkUserUcOneUpdate',
      resolve: { data: data }
    }
  ]

  // add acl and module checks
  routes = routes.map(function(route) {
    route.acl = 'Group'
    route.module = 'Provisioning'
    return route
  })

  angular
    .module('odin.bulk', [])
    .config(function(PbsRouteProvider) {
      PbsRouteProvider.set(routes, '/bulk')
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
