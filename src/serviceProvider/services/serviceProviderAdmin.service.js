;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderAdminService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, admin) {
      var adminId = admin
        ? admin.administratorID || admin.userId || admin
        : admin
      return Route.api('serviceproviders', serviceProviderId, 'admins')(adminId)
    }

    function index(serviceProviderId) {
      return $http.get(url(serviceProviderId)).then(function(response) {
        return response.data
      })
    }

    function store(serviceProviderId, admin) {
      return $http.post(url(serviceProviderId), admin).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, admin) {
      return $http.get(url(serviceProviderId, admin)).then(function(response) {
        return response.data
      })
    }

    function update(serviceProviderId, admin) {
      return $http
        .put(url(serviceProviderId, admin), admin)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, admin) {
      return $http
        .delete(url(serviceProviderId, admin))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
