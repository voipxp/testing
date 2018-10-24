;(function() {
  angular.module('odin.serviceProvider').factory('ServicePackService', Service)

  function Service($http, Route) {
    var url = Route.api('/service-providers/service-packs')
    var service = {
      index: index,
      create: create,
      show: show,
      update: update,
      destroy: destroy,
      usage: usage
    }
    return service

    function index(serviceProviderId, includeUtilization) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            utilization: includeUtilization
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function create(serviceProviderId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, servicePackName) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            servicePackName: servicePackName
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, servicePackName, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, servicePackName) {
      return $http
        .delete(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            servicePackName: servicePackName
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function usage(serviceProviderId, serviceName) {
      return $http
        .get(url('usage'), {
          params: {
            serviceProviderId: serviceProviderId,
            serviceName: serviceName
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
