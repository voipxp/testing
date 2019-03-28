import angular from 'angular'

angular.module('odin.vdm').factory('VdmSystemTemplateService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/vdm/system/templates')
  var service = { index, store, show, update, destroy, assignments }
  service.options = {
    templates: ['t41', 't46', 't48']
  }
  return service

  function index() {
    return $http.get(url()).then(res => res.data)
  }

  function store(template) {
    return $http.post(url(), template).then(res => res.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(res => res.data)
  }

  function assignments(id) {
    return $http
      .get(url('assignments'), { params: { id } })
      .then(res => res.data)
  }

  function update(template) {
    return $http.put(url(), template).then(res => res.data)
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(res => res.data)
  }
}
