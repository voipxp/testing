import angular from 'angular'

angular.module('odin.system').factory('SystemDnService', service)

service.$inject = ['$http', 'Route']
function service($http, Route) {
  var url = Route.api('/system/dns')
  var service = { summary, utilization, show }
  return service

  function summary() {
    return $http.get(url('summary')).then(res => res.data)
  }

  function show(phoneNumber) {
    return $http.get(url(), { params: { phoneNumber } }).then(res => res.data)
  }

  function utilization() {
    return $http.get(url('utilization')).then(res => res.data)
  }
}
