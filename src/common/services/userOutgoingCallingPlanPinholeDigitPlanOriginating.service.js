;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserOutgoingCallingPlanPinholeDigitPlanOriginatingService',
      Service
    )

  function Service($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      userPermissions: [
        'Ignore',
        'Allow',
        'Authorization Code Required',
        'Transfer To First Transfer Number',
        'Transfer To Second Transfer Number',
        'Transfer To Third Transfer Number'
      ]
    }

    return service

    function url(id) {
      return Route.api('users')(
        id,
        'callingplans',
        'outgoing',
        'pinholedigitplan',
        'originating'
      )
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
