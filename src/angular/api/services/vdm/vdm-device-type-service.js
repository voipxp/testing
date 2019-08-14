import angular from 'angular'

angular.module('odin.api').factory('VdmDeviceTypeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/vdm/device-types')
  var service = { index, store, show, update, destroy }
  service.options = {
    templates: ['t41', 't46', 't48']
  }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(object) {
    return $http.post(url(), object).then(response => response.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(object) {
    return $http.put(url(), object).then(response => response.data)
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => response.data)
  }
}
