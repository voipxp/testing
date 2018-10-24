;(function() {
  angular.module('odin.group').factory('GroupAdminService', GroupAdminService)

  function GroupAdminService($http, Route) {
    var url = Route.api('/groups/admins')
    var service = { index, store, show, update, destroy }
    return service

    function getId(admin) {
      return (admin && admin.userId) || admin
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function store(admin) {
      return $http.post(url(), admin).then(res => res.data)
    }

    function show(admin) {
      const userId = getId(admin)
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }

    function update(admin) {
      return $http.put(url(), admin).then(res => res.data)
    }

    function destroy(admin) {
      const userId = getId(admin)
      return $http.delete(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
