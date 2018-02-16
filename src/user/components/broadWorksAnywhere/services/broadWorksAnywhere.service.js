;(function() {
  angular
    .module('odin.user')
    .factory('UserBroadWorksAnywhereService', UserBroadWorksAnywhereService)

  function UserBroadWorksAnywhereService(
    $http,
    Route,
    CacheFactory,
    $rootScope
  ) {
    var url = Route.api('/services/users/broadworksanywhere')
    var service = { show: show, update: update }
    service.options = {
      phonesToRing: ['Fixed', 'Mobile', 'Both'],
      userSettingLevel: ['Group', 'User']
    }
    var cache = CacheFactory('UserBroadWorksAnywhereService')

    $rootScope.$on(
      'PhoneNumberBroadWorksAnywhereService:updated',
      cache.removeAll
    )
    $rootScope.$on(
      'UserBroadworksAnywhereServiceSelectiveCriteria:updated',
      cache.removeAll
    )
    return service

    function show(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
