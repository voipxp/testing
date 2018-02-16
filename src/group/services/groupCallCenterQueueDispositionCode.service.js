;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterQueueDispositionCodeService',
      GroupCallCenterQueueDispositionCodeService
    )

  function GroupCallCenterQueueDispositionCodeService($http, Route) {
    var url = Route.api('/services/groups/callcenters/dispositioncodes/codes')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }

    return service

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

    function show(serviceUserId, code) {
      return $http.get(url(serviceUserId, code)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, code, obj) {
      return $http.put(url(serviceUserId, code), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId, code) {
      return $http.delete(url(serviceUserId, code)).then(function(response) {
        return response.data
      })
    }
  }
})()
