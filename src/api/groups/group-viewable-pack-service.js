import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupViewablePackService', GroupViewablePackService)

GroupViewablePackService.$inject = ['$http', 'Route', '$rootScope']
function GroupViewablePackService($http, Route, $rootScope) {
  var service = { index, services, store, show, update, destroy, users, bulk }
  var url = Route.api('/groups/viewable-packs')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function services(serviceProviderId, groupId) {
    return $http
      .get(url('services'), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, pack) {
    return $http
      .post(url(), { ...pack, serviceProviderId, groupId })
      .then(response => {
        $rootScope.$emit('GroupViewablePackService:updated')
        return response.data
      })
  }

  function show(serviceProviderId, groupId, id) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, id } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, pack) {
    return $http
      .put(url(), { ...pack, serviceProviderId, groupId })
      .then(response => {
        $rootScope.$emit('GroupViewablePackService:updated')
        return response.data
      })
  }

  function destroy(serviceProviderId, groupId, id) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId, id } })
      .then(response => {
        $rootScope.$emit('GroupViewablePackService:updated')
        return response.data
      })
  }

  function users(serviceProviderId, groupId) {
    return $http
      .get(url('bulk'), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function bulk(serviceProviderId, groupId, data) {
    return $http.put(url('bulk'), data).then(response => response.data)
  }
}
