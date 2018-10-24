;(function() {
  angular
    .module('odin.common')
    .factory('UserFeatureAccessCodeService', UserFeatureAccessCodeService)

  function UserFeatureAccessCodeService($http, Route) {
    var service = { index }
    var url = Route.api('/users/feature-access-codes')
    return service

    function index(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
