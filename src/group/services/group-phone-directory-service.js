import angular from 'angular'

angular.module('odin.group').factory('GroupPhoneDirectoryService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show }
  var url = Route.api('/groups/phone-directory')
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }
}
