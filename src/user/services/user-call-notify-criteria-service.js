import angular from 'angular'

angular.module('odin.user').factory('UserCallNotifyCriteriaService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/call-notify/criteria')
  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  service.options = {
    fromDnCriteriaSelection: ['Any', 'Specified Only']
  }
  return service

  function index(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function store(userId, criteria) {
    return $http.post(url(), criteria).then(function(response) {
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

  function update(userId, criteria) {
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
