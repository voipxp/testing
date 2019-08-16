import angular from 'angular'
angular.module('odin.api').factory('GroupPasscodeService', GroupPasscodeService)

GroupPasscodeService.$inject = ['$http', 'Route']
function GroupPasscodeService($http, Route) {
  var service = { show, update }
  var url = Route.api('/groups/passcode-rules')
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
