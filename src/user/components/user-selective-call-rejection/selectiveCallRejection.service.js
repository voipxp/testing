;(function() {
  angular
    .module('odin.user')
    .factory('SelectiveCallRejectionService', SelectiveCallRejectionService)

  function SelectiveCallRejectionService($http, Route) {
    var url = Route.api('/users/selective-call-rejection')
    var service = {
      index: index,
      show: show,
      update: update,
      store: store,
      activation: activation,
      destroy: destroy
    }
    service.options = {
      fromDnCriteriaSelections: ['Any', 'Specified Only'],
      fromDnCriteriaMin: 0,
      fromDnCriteriaMax: 11
    }

    return service

    function index(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function show(userId, criteriaName) {
      return $http
        .get(url(), { params: { userId: userId, criteriaName: criteriaName } })
        .then(function(response) {
          return response.data
        })
    }

    function activation(userId, criteria) {
      return $http.post(url('activation'), criteria).then(function(response) {
        return response.data
      })
    }
    function store(userId, criteria) {
      return $http.post(url(), criteria).then(function(response) {
        return response.data
      })
    }

    function update(userId, criteriaName, criteria) {
      return $http.put(url(), criteria).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, criteriaName) {
      return $http
        .delete(url(), {
          params: { userId: userId, criteriaName: criteriaName }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
