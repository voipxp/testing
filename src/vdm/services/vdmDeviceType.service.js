;(function() {
  angular.module('odin.vdm').factory('VdmDeviceTypeService', Service)

  function Service($http, Route) {
    var url = Route.api2('/vdm/device-types')
    var service = { index, store, show, update, destroy }
    service.options = {
      templates: ['t41', 't46', 't48']
    }
    return service

    function index() {
      return $http.get(url()).then(res => res.data)
    }

    function store(obj) {
      return $http.post(url(), obj).then(res => res.data)
    }

    function show(id) {
      return $http.get(url(), { params: { id } }).then(res => res.data)
    }

    function update(obj) {
      return $http.put(url(), obj).then(res => res.data)
    }

    function destroy(id) {
      return $http.delete(url(), { params: { id } }).then(res => res.data)
    }
  }
})()
