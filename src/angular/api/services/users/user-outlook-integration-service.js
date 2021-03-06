import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserOutlookIntegrationService', UserOutlookIntegrationService)

UserOutlookIntegrationService.$inject = ['$http', 'Route']
function UserOutlookIntegrationService($http, Route) {
  var url = Route.api('/users/outlook-integration')
  var service = { show: show, update: update }
  service.options = {
    contactRetrievalSelection: [
      'Retrieve Default Contact Folder Only',
      'Retrieve All Contacts'
    ]
  }

  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
