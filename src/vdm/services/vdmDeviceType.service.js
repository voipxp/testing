;(function() {
  angular.module('odin.vdm').factory('VdmDeviceTypeService', Service)

  function Service($http, Route) {
    var url = Route.api('vdm', 'devicetypes')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      templates: ['t41', 't46', 't48']
    }
    return service

    function index() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }

    function store(obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(obj) {
      return $http.put(url(obj.id), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(id) {
      return $http.delete(url(id)).then(function(response) {
        return response.data
      })
    }
  }
})()
