;(function() {
  angular.module('odin.vdm').factory('VdmSystemTemplateService', Service)

  function Service($http, Route) {
    var url = Route.api('vdm', 'system', 'templates')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      assignments: assignments
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

    function store(template) {
      return $http.post(url(), template).then(function(response) {
        return response.data
      })
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function assignments(id) {
      return $http.get(url(id, 'assignments')).then(function(response) {
        return response.data
      })
    }

    function update(template) {
      return $http.put(url(template.id), template).then(function(response) {
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
