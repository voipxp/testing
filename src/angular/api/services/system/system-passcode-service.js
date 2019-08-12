import angular from 'angular'

angular
  .module('odin.api')
  .factory('SystemPasscodeService', SystemPasscodeService)

SystemPasscodeService.$inject = ['$http', 'Route']
function SystemPasscodeService($http, Route) {
  var url = Route.api('/system/passcode-rules')
  var service = { show: show, update: update }
  return service

  function show() {
    return $http.get(url()).then(response => response.data)
  }

  function update(object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
