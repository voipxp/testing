;(function() {
  angular
    .module('odin.common')
    .factory('ReplicateGroupServiceService', ReplicateGroupServiceService)

  function ReplicateGroupServiceService(
    $http,
    Route,
    CacheFactory,
    $rootScope
  ) {
    var service = { store: store }
    var cache = CacheFactory('ReplicateGroupServiceService')
    return service

    function url(fromServiceProviderId, fromGroupId) {
      return Route.api(
        'serviceproviders',
        fromServiceProviderId,
        'groups',
        fromGroupId,
        'replicates'
      )('groupservices')
    }

    function store(fromServiceProviderId, fromGroupId, obj) {
      return $http
        .post(url(fromServiceProviderId, fromGroupId), obj)
        .then(function(response) {
          $rootScope.$emit('ReplicateGroupServiceService:store')
          return response.data
        })
    }
  }
})()