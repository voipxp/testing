;(function() {
  angular
    .module('odin.user')
    .factory('UserBroadworksAnywhereServiceSelectiveCriteria', Service)

  function Service($http, Route, $rootScope, CacheFactory) {
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
    var cache = CacheFactory('UserBroadworksAnywhereServiceSelectiveCriteria')
    return service

    function url(userId, phoneNumber, criteriaName) {
      return Route.api(
        '/services/users/broadworksanywhere',
        userId,
        'phonenumbers',
        phoneNumber,
        'criteria',
        criteriaName
      )()
    }

    function store(userId, phoneNumber, criteria) {
      return $http
        .post(url(userId, phoneNumber), criteria)
        .then(function(response) {
          cache.removeAll()
          $rootScope.$emit(
            'UserBroadworksAnywhereServiceSelectiveCriteria:update'
          )
          return response.data
        })
    }

    function show(userId, phoneNumber, criteriaName) {
      return $http
        .get(url(userId, phoneNumber, criteriaName), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, phoneNumber, criteriaName, criteria) {
      return $http
        .put(url(userId, phoneNumber, criteriaName), criteria)
        .then(function(response) {
          cache.removeAll()
          $rootScope.$emit(
            'UserBroadworksAnywhereServiceSelectiveCriteria:update'
          )
          return response.data
        })
    }

    function destroy(userId, phoneNumber, criteriaName) {
      return $http
        .delete(url(userId, phoneNumber, criteriaName))
        .then(function(response) {
          cache.removeAll()
          $rootScope.$emit(
            'UserBroadworksAnywhereServiceSelectiveCriteria:update'
          )
          return response.data
        })
    }
  }
})()
