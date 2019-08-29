import angular from 'angular'

angular.module('odin.api').factory('GroupDomainService', GroupDomainService)

GroupDomainService.$inject = ['$http', 'Route']
function GroupDomainService($http, Route) {
  var url = Route.api('/groups/domains')
  var service = { index: index }
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }
}
