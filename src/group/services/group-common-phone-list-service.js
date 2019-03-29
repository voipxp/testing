import angular from 'angular'

angular.module('odin.group').factory('GroupCommonPhoneListService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, update, destroy }
  var url = Route.api('/groups/common-phone-list')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(res => res.data)
  }

  function store(serviceProviderId, groupId, entries) {
    return $http
      .post(url(), { serviceProviderId, groupId, entries })
      .then(res => res.data)
  }

  function update(serviceProviderId, groupId, entry) {
    return $http
      .put(url(), { ...entry, serviceProviderId, groupId })
      .then(res => res.data)
  }

  function destroy(serviceProviderId, groupId, entries) {
    return $http
      .delete(url(), { data: { serviceProviderId, groupId, entries } })
      .then(res => res.data)
  }
}
