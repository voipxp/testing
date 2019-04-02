;(function() {
  angular
    .module('odin.user')
    .factory('UserSequentialRingServiceCriteria', Service)

  function Service($http, Route) {
    var url = Route.api('/users/sequential-ring/criteria')
    var service = {
      show: show,
      update: update,
      index: index,
      store: store,
      destroy: destroy
    }
    service.options = {
      fromDnCriteriaSelection: ['Any', 'Specified Only']
    }
    return service

    function show(userId, criteriaName) {
      return $http
        .get(url(), { params: { userId: userId, criteriaName: criteriaName } })
        .then(function(response) {
          return response.data
        })
    }

    function index(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, criteriaName, object) {
      return $http.put(url(), object).then(function(response) {
        return response.data
      })
    }

    function store(userId, object) {
      return $http.post(url(), object).then(function(response) {
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
