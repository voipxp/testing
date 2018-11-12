;(function() {
  angular.module('odin.common').factory('UserService', UserService)

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
        .then(res => res.data)
    }

    function info(userId) {
      return $http
        .get(url('login'), { params: { userId } })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, user) {
      return $http
        .post(url(), { ...user, serviceProviderId, groupId })
        .then(res => res.data)
    }

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(userId, user) {
      return $http.put(url(), user).then(res => res.data)
    }

    function bulk(data) {
      return $http.put(url('bulk'), data).then(res => res.data)
    }

    function destroy(userId) {
      return $http.delete(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
