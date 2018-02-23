;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserCallForwardingSelectiveCriteriaService',
      UserCallForwardingSelectiveCriteriaService
    )

  function UserCallForwardingSelectiveCriteriaService($http, Route) {
    var service = {
      index: index,
      create: create,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      forwardToNumberSelection: [
        'Forward To Default Number',
        'Forward To Specified Number',
        'Do not forward'
      ],
      fromDnCriteriaSelection: ['Any', 'Specified Only']
    }
    return service

    function url(userId, criteriaName) {
      return Route.api('/services/users/callforwardingselective')(
        userId,
        'criteria',
        criteriaName
      )
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function create(userId, obj) {
      return $http.post(url(userId), obj).then(function(response) {
        return response.data
      })
    }

    function show(userId, name) {
      return $http.get(url(userId, name)).then(function(response) {
        return response.data
      })
    }

    function update(userId, name, obj) {
      return $http.put(url(userId, name), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, name) {
      return $http.delete(url(userId, name)).then(function(response) {
        return response.data
      })
    }
  }
})()
