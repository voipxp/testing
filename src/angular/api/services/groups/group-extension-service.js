import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupExtensionService', GroupExtensionService)

GroupExtensionService.$inject = ['$http', 'Route']
function GroupExtensionService($http, Route) {
  var service = { show, update }
  var url = Route.api('/groups/extensions')
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
