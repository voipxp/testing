;(function() {
  angular
    .module('odin.common')
    .factory('UserFeatureAccessCodeService', UserFeatureAccessCodeService)

  function UserFeatureAccessCodeService($http, Route) {
    var service = { index: index }
    return service

    function url(id) {
      return Route.api('users')(id, 'featureaccesscodes')
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }
  }
})()
