;(function() {
  angular.module('odin.vdm').factory('VdmGroupTemplateService', Service)

  function Service($http, Route) {
    var url = Route.api2('/vdm/groups/templates')
    var service = { index, show, store, update, destroy }
    service.options = { templates: ['t41', 't46', 't48'] }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function show(serviceProviderId, groupId, id) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, id } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, template) {
      return $http
        .post(url(), template, { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, template) {
      return $http
        .put(url(), template, { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function destroy(serviceProviderId, groupId, id) {
      return $http
        .delete(url(), { params: { serviceProviderId, groupId, id } })
        .then(res => res.data)
    }
  }
})()
