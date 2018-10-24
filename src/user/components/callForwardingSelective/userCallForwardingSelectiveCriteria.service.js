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
    var url = Route.api('/users/call-forwarding-selective/criteria')
    return service

    function index(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function create(userId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(userId, name) {
      return $http
        .get(url(), { params: { userId: userId, criteriaName: name } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, name, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, name) {
      return $http
        .delete(url(), { params: { userId: userId, criteriaName: name } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
