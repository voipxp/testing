;(function() {
  angular
    .module('odin.user')
    .factory('UserOutlookIntegrationService', UserOutlookIntegrationService)

  function UserOutlookIntegrationService($http, Route) {
    var url = Route.api('/services/users/outlookintegration')
    var service = { show: show, update: update, index: index }
    service.options = {
      contactRetrievalSelection: [
        'Retrieve Default Contact Folder Only',
        'Retrieve All Contacts'
      ]
    }

    return service

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        console.log(response.data)
        return response.data
      })
    }
  }
})()
