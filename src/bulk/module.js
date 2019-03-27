import angular from 'angular'
import routes from './routes'

angular
  .module('odin.bulk', [])
  .config(routes)
  .run([
    '$rootScope',
    '$location',
    function($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function(e, c, p, error) {
        if (error === 'routeToSelect') {
          var path = $location
            .path()
            .split('/')
            .pop()
          $location.path('bulk/users').search({ next: path })
        }
      })
    }
  ])
