;(function() {
  angular
    .module('odin.group')
    .factory('GroupFeatureAccessCodesService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/feature-access-codes')

    var service = {
      show: show,
      update: update
    }
    service.options = {
      useFeatureAccessCodeLevel: ['Service Provider', 'Group']
    }

    return service

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
