;(function() {
  angular.module('odin.user').factory('UserCallNotifyCriteriaService', Service)

  function Service($http, Route, CacheFactory, $rootScope) {
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
    var cache = CacheFactory('UserCallNotifyCriteriaService')
    return service

    function url(userId, criteriaName) {
      return Route.api(
        '/services/users/callnotify',
        userId,
        'criteria',
        criteriaName
      )()
    }

    function index(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function store(userId, criteria) {
      return $http.post(url(userId), criteria).then(function(response) {
        $rootScope.$emit('UserCallNotifyCriteriaService:updated')
        cache.removeAll()
        return response.data
      })
    }

    function show(userId, criteriaName) {
      return $http
        .get(url(userId, criteriaName), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, criteria) {
      return $http
        .put(url(userId, criteria.criteriaName), criteria)
        .then(function(response) {
          $rootScope.$emit('UserCallNotifyCriteriaService:updated')
          cache.removeAll()
          return response.data
        })
    }

    function destroy(userId, criteriaName) {
      return $http.delete(url(userId, criteriaName)).then(function(response) {
        $rootScope.$emit('UserCallNotifyCriteriaService:updated')
        cache.removeAll()
        return response.data
      })
    }
  }
})()
