import angular from 'angular'

angular.module('odin.api').factory('UserPhoneDirectoryService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show }
  var url = Route.api('/users/phone-directory')
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }
}
