;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderReportsService', ServiceProviderReportsService)

  function ServiceProviderReportsService(
    $http,
    Route,
    $rootScope,
    CacheFactory
  ) {
    var url = Route.api2('/service-providers/reports')
    var service = { index }
    var cache = CacheFactory('ServiceProviderReportsService')
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
