import angular from 'angular'

angular.module('odin.api').factory('UserSequentialRingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/sequential-ring')
  var service = { show: show, update: update }
  service.options = {
    numberOfRings: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    baseLocationNumberOfRings: [
      0,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ]
  }
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
