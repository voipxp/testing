;(function() {
  angular.module('odin.group').factory('GroupFeatureAccessCodeService', Service)

  function Service($http, Route) {
    var url = Route.api('/services/groups/featureaccesscodes')

    var service = {
      show: show,
      update: update
    }
    service.options = {}

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
