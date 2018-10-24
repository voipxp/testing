;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderAdminService', Service)

  function Service($http, Route) {
    var service = { index, store, show, update, destroy }
    var url = Route.api('/service-providers/admins')
    return service

    function getId(admin) {
      return admin ? admin.administratorID || admin.userId || admin : admin
    }

    function index(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, admin) {
      return $http.post(url(), admin).then(res => res.data)
    }

    function show(serviceProviderId, admin) {
      const userId = getId(admin)
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(serviceProviderId, admin) {
      return $http.put(url(), admin).then(res => res.data)
    }

    function destroy(serviceProviderId, admin) {
      const userId = getId(admin)
      return $http.delete(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
