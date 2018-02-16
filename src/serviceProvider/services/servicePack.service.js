;(function() {
  angular.module('odin.serviceProvider').factory('ServicePackService', Service)

  function Service($http, Route) {
    var base = Route.api('/services/serviceproviders')
    var service = {
      index: index,
      create: create,
      show: show,
      update: update,
      destroy: destroy,
      usage: usage
    }
    return service

    function url(serviceProviderId, servicePackName) {
      return base(serviceProviderId, 'servicepacks', servicePackName)
    }

    function index(serviceProviderId, includeUtilization) {
      return $http
        .get(url(serviceProviderId), {
          params: { utilization: includeUtilization }
        })
        .then(function(response) {
          return response.data
        })
    }

    function create(serviceProviderId, obj) {
      return $http.post(url(serviceProviderId), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, servicePackName) {
      return $http
        .get(url(serviceProviderId, servicePackName))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, servicePackName, obj) {
      return $http
        .put(url(serviceProviderId, servicePackName), obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, servicePackName) {
      return $http
        .delete(url(serviceProviderId, servicePackName))
        .then(function(response) {
          return response.data
        })
    }

    function usage(serviceProviderId, serviceName) {
      return $http
        .get(base(serviceProviderId, 'servicepackusage'), {
          params: {
            serviceName: serviceName
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
