;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserPriorityAlertCriteriaService',
      UserPriorityAlertCriteriaService
    )

  function UserPriorityAlertCriteriaService($http, Route) {
    var url = Route.api('/services/users/priorityalert')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      fromDnCriteriaSelection: ['Any External', 'Specified Only']
    }
    return service

    function index(userId) {
      return $http.get(url(userId, 'criteria')).then(function(response) {
        return response.data
      })
    }

    function store(userId, criteria) {
      return $http
        .post(url(userId, 'criteria'), criteria)
        .then(function(response) {
          return response.data
        })
    }

    function show(userId, criteriaName) {
      return $http
        .get(url(userId, 'criteria', criteriaName))
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, criteriaName, criteria) {
      return $http
        .put(url(userId, 'criteria', criteriaName), criteria)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(userId, criteriaName) {
      return $http
        .delete(url(userId, 'criteria', criteriaName))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
