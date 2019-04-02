import angular from 'angular'
angular
  .module('odin.common')
  .factory('GroupPasscodeService', GroupPasscodeService)

GroupPasscodeService.$inject = ['$http', 'Route', 'CacheFactory']
function GroupPasscodeService($http, Route, CacheFactory) {
  var cache = CacheFactory('GroupPasscodeService')
  var service = { show, update }
  var url = Route.api('/groups/passcode-rules')
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { cache, params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
