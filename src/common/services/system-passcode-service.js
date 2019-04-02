import angular from 'angular'

angular
  .module('odin.common')
  .factory('SystemPasscodeService', SystemPasscodeService)

SystemPasscodeService.$inject = ['$http', 'Route', 'CacheFactory']
function SystemPasscodeService($http, Route, CacheFactory) {
  var cache = CacheFactory('SystemPasscodeService')
  var url = Route.api('/system/passcode-rules')
  var service = { show: show, update: update }
  return service

  function show() {
    return $http.get(url(), { cache: cache }).then(response => response.data)
  }

  function update(object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
