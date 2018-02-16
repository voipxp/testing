;(function() {
  angular
    .module('odin.user')
    .factory('PhoneNumberBroadWorksAnywhereService', Service)

  function Service($http, Route, $rootScope) {
    var service = {
      show: show,
      update: update,
      index: index,
      destroy: destroy,
      store: store
    }
    service.options = {}

    return service

    function url(userId, phoneNumber) {
      return Route.api(
        '/services/users/broadworksanywhere',
        userId,
        'phonenumbers',
        phoneNumber
      )()
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function store(userId, number) {
      return $http.post(url(userId), number).then(function(response) {
        $rootScope.$emit('PhoneNumberBroadWorksAnywhereService:updated')
        return response.data
      })
    }

    function show(userId, phoneNumber) {
      return $http.get(url(userId, phoneNumber)).then(function(response) {
        return response.data
      })
    }

    function update(userId, phoneNumber, number) {
      return $http
        .put(url(userId, phoneNumber), number)
        .then(function(response) {
          $rootScope.$emit('PhoneNumberBroadWorksAnywhereService:updated')
          return response.data
        })
    }

    function destroy(userId, phoneNumber) {
      return $http.delete(url(userId, phoneNumber)).then(function(response) {
        $rootScope.$emit('PhoneNumberBroadWorksAnywhereService:updated')
        return response.data
      })
    }
  }
})()
