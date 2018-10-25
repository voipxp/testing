;(function() {
  angular.module('odin.serviceProvider').factory('ServicePackService', Service)

  function Service($http, Route) {
    var url = Route.api('/service-providers/service-packs')
    var service = { index, create, show, update, destroy, usage }
    return service

    function index(serviceProviderId, includeUtilization) {
      return $http
        .get(url(), { params: { serviceProviderId, includeUtilization } })
        .then(res => res.data)
    }

    function create(serviceProviderId, obj) {
      return $http.post(url(), obj).then(res => res.data)
    }

    function show(serviceProviderId, servicePackName) {
      return $http
        .get(url(), { params: { serviceProviderId, servicePackName } })
        .then(res => res.data)
    }

    function update(serviceProviderId, servicePackName, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }

    function destroy(serviceProviderId, servicePackName) {
      return $http
        .delete(url(), { params: { serviceProviderId, servicePackName } })
        .then(res => res.data)
    }

    function usage(serviceProviderId, serviceName) {
      return $http
        .get(url('usage'), { params: { serviceProviderId, serviceName } })
        .then(res => res.data)
    }
  }
})()
