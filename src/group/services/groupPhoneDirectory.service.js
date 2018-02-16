;(function() {
  angular.module('odin.group').factory('GroupPhoneDirectoryService', Service)

  function Service($http, Route) {
    var service = { show: show }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'phonedirectory'
      )()
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
