import angular from 'angular'

angular.module('odin.api').factory('GroupCommonPhoneListService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, update, destroy }
  var url = Route.api('/groups/common-phone-list')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, entries) {
    return $http
      .post(url(), { serviceProviderId, groupId, entries })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, entry) {
    return $http
      .put(url(), { ...entry, serviceProviderId, groupId })
      .then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, entries) {
    return $http
      .delete(url(), { data: { serviceProviderId, groupId, entries } })
      .then(response => response.data)
  }
}
