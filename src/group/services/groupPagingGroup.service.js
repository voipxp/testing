;(function() {
  angular
    .module('odin.group')
    .factory('GroupPagingGroupService', GroupPagingGroupService)

  function GroupPagingGroupService($http, Route) {
    var url = Route.api('/services/groups/paging/groups')

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

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function status(instance) {
      return $http
        .put(url(), { instances: [instance] })
        .then(function(response) {
          return response.data
        })
    }

    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(id) {
      return $http.delete(url(id)).then(function(response) {
        return response.data
      })
    }
  }
})()
