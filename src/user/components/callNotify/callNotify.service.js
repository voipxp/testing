;(function() {
  angular.module('odin.user').factory('UserCallNotifyService', Service)

  function Service($http, Route, CacheFactory, $rootScope) {
    var url = Route.api('/services/users/callnotify')
    var service = { show: show, update: update }
    var cache = CacheFactory('UserCallNotifyService')

    $rootScope.$on('UserCallNotifyCriteriaService:updated', cache.removeAll)

    return service

    function show(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function update(userId, settings) {
      return $http.put(url(userId), settings).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
