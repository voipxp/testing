;(function() {
  angular
    .module('odin.common')
    .factory('SystemCommunicationBarringProfileService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemCommunicationBarringProfileService')
    var url = Route.api('system', 'communicationbarringprofiles')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
