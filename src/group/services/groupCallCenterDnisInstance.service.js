;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterDnisInstanceService',
      GroupCallCenterDnisInstanceService
    )

  function GroupCallCenterDnisInstanceService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/dnis')
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

    function url(serviceUserId, name) {
      return _url(serviceUserId, 'instances', name)
    }

    function index(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function store(serviceUserId, obj) {
      return $http.post(url(serviceUserId), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceUserId, name) {
      return $http.get(url(serviceUserId, name)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, name, obj) {
      return $http.put(url(serviceUserId, name), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId, name) {
      return $http.delete(url(serviceUserId, name)).then(function(response) {
        return response.data
      })
    }
  }
})()
