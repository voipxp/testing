;(function() {
  angular
    .module('odin.user')
    .factory('UserSimultaneousRingPersonalServiceCriteria', Service)

  function Service($http, Route) {
    var url = Route.api2('/users/simultaneous-ring-personal/criteria')
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

    function update(userId, criteriaName, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function store(userId, obj) {
      return $http.post(url(), obj).then(function(response) {
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
