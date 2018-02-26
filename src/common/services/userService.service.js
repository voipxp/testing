;(function() {
  angular
    .module('odin.common')
    .factory('UserServiceService', UserServiceService)

  function UserServiceService($http, Route, CacheFactory, $rootScope) {
    var cache = CacheFactory('UserServiceService')
    var service = {
      show: show,
      update: update,
      assigned: assigned,
      viewable: viewable
    }

    // clear cache on service related updates
    $rootScope.$on('GroupViewablePackService:updated', clearCache)
    $rootScope.$on('UserViewablePackService:updated', clearCache)
    $rootScope.$on('BrandingModuleService:updated', clearCache)
    $rootScope.$on('GroupServiceService:updated', clearCache)
    $rootScope.$on('ServiceProviderServiceService:updated', clearCache)

    return service

    function clearCache() {
      cache.removeAll()
    }

    function url(userId, type) {
      return Route.api('users')(userId, 'services', type)
    }

    function show(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function assigned(userId) {
      return $http
        .get(url(userId, 'assigned'), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function viewable(userId) {
      return $http
        .get(url(userId, 'viewable'), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, service) {
      return $http.put(url(userId), service).then(function(response) {
        cache.removeAll()
        $rootScope.$broadcast('UserServiceService:updated')
        return response.data
      })
    }
  }
})()
