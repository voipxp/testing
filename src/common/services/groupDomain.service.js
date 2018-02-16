;(function() {
  angular
    .module('odin.common')
    .factory('GroupDomainService', GroupDomainService)

  function GroupDomainService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupDomainService')
    var service = { index: index }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('domains')
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
