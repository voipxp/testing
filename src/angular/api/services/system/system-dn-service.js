import angular from 'angular'

angular.module('odin.api').factory('SystemDnService', service)

service.$inject = ['$http', 'Route']
function service($http, Route) {
  var url = Route.api('/system/dns')
  var service = { summary, utilization, show }
  return service

  function summary() {
    return $http.get(url('summary')).then(response => response.data)
  }

  function show(phoneNumber) {
    return $http.get(url(), { params: { phoneNumber } }).then(response => response.data)
  }

  function utilization() {
    return $http.get(url('utilization')).then(response => response.data)
  }
}
