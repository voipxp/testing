;(function() {
  angular
    .module('odin.common')
    .factory('GroupOciCommandService', GroupOciCommandService)

  function GroupOciCommandService($http, Route) {
    var service = { index: index }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api('serviceprovider', serviceProviderId, 'group', groupId)(
        'ocicommands'
      )
      // return Route.api('serviceprovider', serviceProviderId, 'group', groupId)('ocicommands')
    }
    // activated, summary, default
    function index(serviceProviderId, groupId, command) {
      var params = { command: command }
      return $http
        .get(url(serviceProviderId, groupId), { params: params })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
