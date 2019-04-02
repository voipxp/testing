import angular from 'angular'

angular.module('odin.vdm').factory('VdmGroupTemplateTagService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, update, store }
  var url = Route.api('/vdm/groups/templates/tags')
  return service

  function index(serviceProviderId, groupId, templateId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, templateId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, templateId, tag) {
    return $http
      .post(url(), tag, {
        params: { serviceProviderId, groupId, templateId }
      })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, templateId, tag) {
    return $http
      .put(url(), tag, { params: { serviceProviderId, groupId, templateId } })
      .then(response => response.data)
  }
}
