;(function() {
  angular.module('odin.system').factory('SystemDnService', SystemDnService)

  function SystemDnService($http, Route) {
    var url = Route.api('/system/dns')
    var service = { summary: summary, utilization: utilization }
    return service

    function summary() {
      return $http.get(url('summary')).then(function(response) {
        return response.data
      })
    }

    function utilization() {
      return $http.get(url('utilization')).then(function(response) {
        return response.data
      })
    }
  }
})()
