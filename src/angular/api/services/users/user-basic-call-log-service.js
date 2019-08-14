import angular from 'angular'

angular.module('odin.api').factory('UserBasicCallLogService', UserBasicCallLogService)

UserBasicCallLogService.$inject = ['$http', 'Route']
function UserBasicCallLogService($http, Route) {
  var service = { show: show }
  var url = Route.api('/users/basic-call-logs')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }
}
