import angular from 'angular'

angular.module('odin.api').factory('UserService', UserService)

UserService.$inject = ['$http', 'Route']
function UserService($http, Route) {
  var service = {
    index,
    store,
    show,
    update,
    destroy,
    info,
    bulk
  }
  var url = Route.api('/users')

  return service

  function index(serviceProviderId, groupId, extended) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, extended } })
      .then(response => response.data)
  }

  function info(userId) {
    return $http
      .get(url('login'), { params: { userId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, user) {
    return $http
      .post(url(), { ...user, serviceProviderId, groupId })
      .then(response => response.data)
  }

  function show(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }

  function update(userId, user) {
    return $http.put(url(), user).then(response => response.data)
  }

  function bulk(data) {
    return $http.put(url('bulk'), data).then(response => response.data)
  }

  function destroy(userId) {
    return $http
      .delete(url(), { params: { userId } })
      .then(response => response.data)
  }
}
