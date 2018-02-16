;(function() {
  angular
    .module('odin.user')
    .factory('AlternateNumbersService', AlternateNumbersService)

  function AlternateNumbersService($http, Route) {
    var url = Route.api('/services/users/alternatenumbers')
    var service = { index: index, update: update }
    service.options = {
      ringPatterns: [
        'Normal',
        'Long-Long',
        'Short-Short-Long',
        'Short-Long-Short'
      ],
      alternateNumberRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      minAlternateNumbers: 1,
      maxAlternateNumbers: 10
    }
    return service

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        console.log('obj.update : ' + userId + ' ' + JSON.stringify(obj))
        console.log('AlternateNumbersService.update : ' + response.data)
        return response.data
      })
    }
  }
})()
