import angular from 'angular'

angular.module('odin.api').factory('SystemNetworkClassOfServiceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/network-class-of-services')
  var service = { index, store, show, update, destroy, usage }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(service) {
    return $http.post(url(), service).then(response => {
      return response.data
    })
  }

  function show(name) {
    return $http.get(url(), { params: { name } }).then(response => response.data)
  }

  function update(name, service) {
    return $http.put(url(), service).then(response => {
      return response.data
    })
  }

  function destroy(name) {
    return $http.delete(url(), { params: { name } }).then(response => {
      return response.data
    })
  }

  function usage(name) {
    return $http.get(url('usage'), { params: { name } }).then(response => response.data)
  }
}
