;(function() {
  angular
    .module('odin.common')
    .factory(
      'GroupNetworkClassOfServiceService',
      GroupNetworkClassOfServiceService
    )

  function GroupNetworkClassOfServiceService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupNetworkClassOfServiceService')
    var service = { index: index }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('networkclassofservices')
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
