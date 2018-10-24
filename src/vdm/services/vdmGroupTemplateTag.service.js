;(function() {
  angular.module('odin.vdm').factory('VdmGroupTemplateTagService', Service)

  function Service($http, Route) {
    var service = { index, update, store }
    var url = Route.api('/vdm/groups/templates/tags')
    return service

    function index(serviceProviderId, groupId, templateId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, templateId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, templateId, tag) {
      return $http
        .post(url(), tag, {
          params: { serviceProviderId, groupId, templateId }
        })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, templateId, tag) {
      return $http
        .put(url(), tag, { params: { serviceProviderId, groupId, templateId } })
        .then(res => res.data)
    }
  }
})()
