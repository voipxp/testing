import angular from 'angular'

angular.module('odin.api').factory('VdmGroupTemplateService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/vdm/groups/templates')
  var service = { index, show, store, update, destroy }
  service.options = { templates: ['t41', 't46', 't48'] }
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function show(serviceProviderId, groupId, id) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, id } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, template) {
    return $http
      .post(url(), template, { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, template) {
    return $http
      .put(url(), template, { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, id) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId, id } })
      .then(response => response.data)
  }
}
