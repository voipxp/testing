;(function() {
  angular.module('odin.group').factory('GroupSpeedDial100Service', Service)

  function Service($http, Route) {
    var url = Route.api2('/services/groups/speeddial100')

    var service = {
      show: show,
      update: update
    }
    service.options = {
      minLength: 1,
      maxLength: 2
    }

    return service
    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
