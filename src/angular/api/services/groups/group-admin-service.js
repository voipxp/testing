import angular from 'angular'

angular.module('odin.api').factory('GroupAdminService', GroupAdminService)

GroupAdminService.$inject = ['$http', 'Route']
function GroupAdminService($http, Route) {
  var url = Route.api('/groups/admins')
  var service = { index, store, show, update, destroy }
  return service

  function getId(admin) {
    return (admin && admin.userId) || admin
  }

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(admin) {
    return $http.post(url(), admin).then(response => response.data)
  }

  function show(admin) {
    const userId = getId(admin)
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }

  function update(admin) {
    return $http.put(url(), admin).then(response => response.data)
  }

  function destroy(admin) {
    const userId = getId(admin)
    return $http.delete(url(), { params: { userId } }).then(response => response.data)
  }
}
