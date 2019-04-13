import angular from 'angular'

angular.module('odin.bulk', [])

// .run([
//   '$rootScope',
//   '$location',
//   ($rootScope, $location) => {
//     $rootScope.$on('$routeChangeError', function(
//       event,
//       current,
//       previous,
//       error
//     ) {
//       if (error === 'routeToSelect') {
//         var path = $location
//           .path()
//           .split('/')
//           .pop()
//         $location.path('bulk/users').search({ next: path })
//       }
//     })
//   }
// ])
