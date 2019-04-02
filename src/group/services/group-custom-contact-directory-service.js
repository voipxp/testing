import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCustomContactDirectoryService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, show, update, destroy, users }
  var url = Route.api('/groups/custom-contact-directory')
  return service

  function users(serviceProviderId, groupId) {
    return $http
      .get(url('users'), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, directory) {
    return $http.post(url(), directory).then(response => response.data)
  }

  function show(serviceProviderId, groupId, name) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, name } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, directory) {
    return $http.put(url(), directory).then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, name) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId, name } })
      .then(function(response) {
        return response.data
      })
  }
}
