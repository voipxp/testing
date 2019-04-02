import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCommunicationBarringAuthorizationCodeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, create, destroy }
  var url = Route.api('/groups/communication-barring/authorization-codes')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function create(serviceProviderId, groupId, codes) {
    return $http
      .post(url(), { serviceProviderId, groupId, codes })
      .then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, codes) {
    return $http
      .delete(url(), { data: { serviceProviderId, groupId, codes } })
      .then(response => response.data)
  }
}
