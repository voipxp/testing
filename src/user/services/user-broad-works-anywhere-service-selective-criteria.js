import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserBroadworksAnywhereServiceSelectiveCriteria', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = {
    store: store,
    show: show,
    update: update,
    destroy: destroy
  }
  service.options = {
    fromDnCriteriaSelections: ['Any', 'Specified Only'],
    fromDnCriteriaMin: 0,
    fromDnCriteriaMax: 11
  }
  var url = Route.api('/users/broad-works-anywhere/criteria')
  return service

  function store(userId, phoneNumber, criteria) {
    return $http.post(url(), criteria).then(function(response) {
      return response.data
    })
  }

  function show(userId, phoneNumber, criteriaName) {
    return $http
      .get(url(), {
        params: {
          userId: userId,
          phoneNumber: phoneNumber,
          criteriaName: criteriaName
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, phoneNumber, criteriaName, criteria) {
    return $http.put(url(), criteria).then(function(response) {
      return response.data
    })
  }

  function destroy(userId, phoneNumber, criteriaName) {
    return $http
      .delete(url(), {
        params: {
          userId: userId,
          phoneNumber: phoneNumber,
          criteriaName: criteriaName
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
