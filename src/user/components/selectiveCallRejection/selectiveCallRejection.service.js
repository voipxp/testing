;(function() {
  angular
    .module('odin.user')
    .factory('SelectiveCallRejectionService', SelectiveCallRejectionService)

  function SelectiveCallRejectionService($http, Route) {
    var url = Route.api('/services/users/selectivecallrejection')
    var service = {
      index: index,
      show: show,
      update: update,
      post: post,
      criteriaactivation: criteriaactivation,
      destroy: destroy
    }
    service.options = {
      fromDnCriteriaSelections: ['Any', 'Specified Only'],
      fromDnCriteriaMin: 0,
      fromDnCriteriaMax: 11
    }

    return service

    function index(userId) {
      return $http.get(url(userId) + '/criteria').then(function(response) {
        return response.data
      })
    }

    function show(userId, criteriaName) {
      return $http
        .get(url(userId) + '/criteria/' + criteriaName)
        .then(function(response) {
          return response.data
        })
    }

    function criteriaactivation(userId, criteria) {
      return $http
        .post(url(userId) + '/criteriaactivation', criteria)
        .then(function(response) {
          return response.data
        })
    }
    function post(userId, criteria) {
      return $http
        .post(url(userId) + '/criteria', criteria)
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, criteriaName, criteria) {
      return $http
        .put(url(userId) + '/criteria/' + criteriaName, criteria)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(userId, criteriaName, criteria) {
      return $http
        .delete(url(userId) + '/criteria/' + criteriaName, criteria)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
