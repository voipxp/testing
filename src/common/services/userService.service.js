;(function() {
  angular
    .module('odin.common')
    .factory('UserServiceService', UserServiceService)

  function UserServiceService($http, Route, $rootScope) {
    var service = {
      show: show,
      update: update,
      assigned: assigned,
      viewable: viewable
    }
    var url = Route.api('/users/services')

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function assigned(userId) {
      return $http
        .get(url('assigned'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function viewable(userId) {
      return $http
        .get(url('viewable'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(service) {
      return $http.put(url(), service).then(function(response) {
        $rootScope.$broadcast('UserServiceService:updated')
        return response.data
      })
    }
  }
})()
