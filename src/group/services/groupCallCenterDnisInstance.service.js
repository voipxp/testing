;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterDnisInstanceService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/dnis/instances')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      priority: ['0 - Highest', '1 - High', '2 - Medium', '3 - Low']
    }

    return service

    function index(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceUserId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceUserId, name) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId, name: name } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, name, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId, name) {
      return $http
        .delete(url(), { params: { serviceUserId: serviceUserId, name: name } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
