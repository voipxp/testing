;(function() {
  angular.module('odin.group').factory('GroupAdminService', GroupAdminService)

  function GroupAdminService($http, Route) {
    var urls = Route.api2('/groups/admins')
    var url = Route.api2('/groups/admin')

    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(urls(), { params: { serviceProviderId, groupId } })
        .then(resp => resp.data)
    }

    function store(obj) {
      return $http.post(urls(), obj).then(resp => resp.data)
    }

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(resp => resp.data)
    }

    function update(obj) {
      return $http.put(urls(), obj).then(resp => resp.data)
    }

    function destroy(userId) {
      return $http
        .delete(urls(), { params: { userId } })
        .then(resp => resp.data)
    }
  }
})()
