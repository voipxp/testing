;(function() {
  angular
    .module('odin.user')
    .factory('UserOutlookIntegrationService', UserOutlookIntegrationService)

  function UserOutlookIntegrationService($http, Route) {
    var url = Route.api2('/users/outlook-integration')
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

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
