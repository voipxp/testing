import angular from 'angular'

angular.module('odin.api').factory('UserServiceService', UserServiceService)

UserServiceService.$inject = ['$http', 'Route', '$rootScope']
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
    return $http.get(url(), { params: { userId: userId } }).then(({ data }) => {
      console.log('UserServiceService.show()', data)
      return data
    })
  }

  function assigned(userId) {
    return $http
      .get(url('assigned'), { params: { userId: userId } })
      .then(({ data }) => {
        console.log('UserServiceService.assigned()', data)
        return data
      })
  }

  function viewable(userId) {
    return $http
      .get(url('viewable'), { params: { userId: userId } })
      .then(({ data }) => {
        console.log('UserServiceService.viewable()', data)
        return data
      })
  }

  function update(service) {
    return $http.put(url(), service).then(({ data }) => {
      $rootScope.$broadcast('UserServiceService:updated')
      console.log('UserServiceService.update()', data)
      return data
    })
  }
}
