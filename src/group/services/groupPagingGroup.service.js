;(function() {
  angular.module('odin.group').factory('GroupPagingGroupService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/paging')

    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      status: status
    }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function store(obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function status(instance) {
      return $http
        .put(url('status'), { instances: [instance] })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId) {
      return $http
        .delete(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
