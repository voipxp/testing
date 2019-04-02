import angular from 'angular'

angular
  .module('odin.common')
  .factory('UserFeatureAccessCodeService', UserFeatureAccessCodeService)

UserFeatureAccessCodeService.$inject = ['$http', 'Route']
function UserFeatureAccessCodeService($http, Route) {
  var service = { index }
  var url = Route.api('/users/feature-access-codes')
  return service

  function index(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }
}
