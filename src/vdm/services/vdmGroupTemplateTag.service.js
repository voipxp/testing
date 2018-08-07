;(function() {
  angular.module('odin.vdm').factory('VdmGroupTemplateTagService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      update: update,
      store: store
    }
    return service

    function url(serviceProviderId, groupId, templateId, tagId) {
      return Route.api(
        'vdm',
        'group',
        serviceProviderId,
        groupId,
        'templates',
        templateId,
        'tags',
        tagId
      )()
    }

    function index(serviceProviderId, groupId, templateId) {
      return $http
        .get(url(serviceProviderId, groupId, templateId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, templateId, tag) {
      return $http
        .post(url(serviceProviderId, groupId, templateId), tag)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, templateId, tag) {
      return $http
        .put(url(serviceProviderId, groupId, templateId, tag.id), tag)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
