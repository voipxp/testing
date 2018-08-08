;(function() {
  angular.module('odin.vdm').factory('VdmSystemTemplateTagService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      update: update,
      store: store
    }
    return service

    function url(templateId, tagId) {
      return Route.api(
        'vdm',
        'system',
        'templates',
        templateId,
        'tags',
        tagId
      )()
    }

    function index(templateId) {
      return $http.get(url(templateId)).then(function(response) {
        return response.data
      })
    }

    function update(templateId, tag) {
      return $http.put(url(templateId, tag.id), tag).then(function(response) {
        return response.data
      })
    }

    function store(templateId, tag) {
      return $http.post(url(templateId), tag).then(function(response) {
        return response.data
      })
    }
  }
})()
