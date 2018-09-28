;(function() {
  angular
    .module('odin.common')
    .factory('UserServiceService', UserServiceService)

  function UserServiceService($http, Route, $rootScope) {
    var service = {
      show: show,
      update: update,
      assigned: assigned,
      viewable: viewable
    }
    var url = Route.api2('users', 'services')

    // clear cache on service related updates
    // $rootScope.$on('GroupViewablePackService:updated', clearCache)
    // $rootScope.$on('UserViewablePackService:updated', clearCache)
    // $rootScope.$on('BrandingModuleService:updated', clearCache)
    // $rootScope.$on('GroupServiceService:updated', clearCache)
    // $rootScope.$on('ServiceProviderServiceService:updated', clearCache)

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function assigned(userId) {
      return $http
        .get(url('assigned'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function viewable(userId) {
      return $http
        .get(url('viewable'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(service) {
      return $http.put(url(), service).then(function(response) {
        $rootScope.$broadcast('UserServiceService:updated')
        return response.data
      })
    }
  }
})()
