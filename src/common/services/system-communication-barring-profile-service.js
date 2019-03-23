import angular from 'angular'

angular
  .module('odin.common')
  .factory('SystemCommunicationBarringProfileService', Service)

Service.$inject = ['$http', 'CacheFactory', 'Route']
function Service($http, CacheFactory, Route) {
  var cache = CacheFactory('SystemCommunicationBarringProfileService')
  var url = Route.api('/system/communication-barring/profiles')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache: cache }).then(res => res.data)
  }
}
