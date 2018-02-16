;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallingPlanDigitPatternService',
      GroupCallingPlanDigitPatternService
    )

  function GroupCallingPlanDigitPatternService($http, Route) {
    var service = {
      index: index,
      store: store,
      update: update,
      destroy: destroy
    }

    return service

    function url(serviceProviderId, groupId, name) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'digitpatterns', name)
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, pattern) {
      return $http
        .post(url(serviceProviderId, groupId), pattern)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, pattern) {
      var name = pattern.name || pattern
      return $http
        .put(url(serviceProviderId, groupId, name), pattern)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, pattern) {
      var name = pattern.name || pattern
      return $http
        .delete(url(serviceProviderId, groupId, name))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
