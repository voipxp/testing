;(function() {
  angular
    .module('odin.group')
    .factory('GroupCommunicationBarringAuthorizationCodeService', Service)

  function Service($http, Route) {
    var service = { index, create, destroy }
    var url = Route.api('/groups/communication-barring/authorization-codes')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function create(serviceProviderId, groupId, codes) {
      return $http
        .post(url(), { serviceProviderId, groupId, codes })
        .then(res => res.data)
    }

    function destroy(serviceProviderId, groupId, codes) {
      return $http
        .delete(url(), { data: { serviceProviderId, groupId, codes } })
        .then(res => res.data)
    }
  }
})()
