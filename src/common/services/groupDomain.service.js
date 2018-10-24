;(function() {
  angular
    .module('odin.common')
    .factory('GroupDomainService', GroupDomainService)

  function GroupDomainService($http, CacheFactory, Route) {
    var url = Route.api('/groups/domains')
    var cache = CacheFactory('GroupDomainService')
    var service = { index: index }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(
          url(),
          { params: { serviceProviderId, groupId } },
          { cache: cache }
        )
        .then(res => res.data)
    }
  }
})()
