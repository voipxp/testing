;(function() {
  angular
    .module('odin.common')
    .factory(
      'SystemVirtualOnNetEnterpriseExtensionsService',
      SystemVirtualOnNetEnterpriseExtensionsService
    )

  function SystemVirtualOnNetEnterpriseExtensionsService(
    $http,
    CacheFactory,
    Route
  ) {
    var url = Route.api('/system/virtualonnetenterpriseextensions')
    var cache = CacheFactory('SystemVirtualOnNetEnterpriseExtensionsService')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
