;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserSimultaneousRingPersonalService',
      UserSimultaneousRingPersonalService
    )

  function UserSimultaneousRingPersonalService($http, Route) {
    var url = Route.api('/services/users/simultaneousringpersonal')
    var service = { show: show, update: update, index: index }
    service.options = {
      numberOfRings: [
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
      ],
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
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
