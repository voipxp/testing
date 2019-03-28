import angular from 'angular'

angular.module('odin.vdm').factory('VdmSystemTemplateTagService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, update, store }
  var url = Route.api('/vdm/system/templates/tags')
  return service

  function index(templateId) {
    return $http.get(url(), { params: { templateId } }).then(res => res.data)
  }

  function update(templateId, tag) {
    return $http
      .put(url(), tag, { params: { templateId } })
      .then(res => res.data)
  }

  function store(templateId, tag) {
    return $http
      .post(url(), tag, { params: { templateId } })
      .then(res => res.data)
  }
}
