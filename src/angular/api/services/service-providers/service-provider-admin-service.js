import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderAdminService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/service-providers/admins')
  return service

  function getId(admin) {
    return admin ? admin.administratorID || admin.userId || admin : admin
  }

  function index(serviceProviderId) {
    return $http.get(url(), { params: { serviceProviderId } }).then(response => response.data)
  }

  function store(serviceProviderId, admin) {
    return $http.post(url(), admin).then(response => response.data)
  }

  function show(serviceProviderId, admin) {
    const userId = getId(admin)
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }

  function update(serviceProviderId, admin) {
    return $http.put(url(), admin).then(response => response.data)
  }

  function destroy(serviceProviderId, admin) {
    const userId = getId(admin)
    return $http.delete(url(), { params: { userId } }).then(response => response.data)
  }
}
