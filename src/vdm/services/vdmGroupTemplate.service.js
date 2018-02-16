;(function() {
  angular.module('odin.vdm').factory('VdmGroupTemplateService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      show: show,
      store: store,
      update: update,
      destroy: destroy
    }
    service.options = { templates: ['t41', 't46', 't48'] }
    return service

    function url(serviceProviderId, groupId, templateId) {
      return Route.api(
        'vdm',
        'group',
        serviceProviderId,
        groupId,
        'templates',
        templateId
      )()
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, id) {
      return $http
        .get(url(serviceProviderId, groupId, id))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, template) {
      return $http
        .post(url(serviceProviderId, groupId), template)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, template) {
      return $http
        .put(url(serviceProviderId, groupId, template.id), template)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, id) {
      return $http
        .delete(url(serviceProviderId, groupId, id))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
