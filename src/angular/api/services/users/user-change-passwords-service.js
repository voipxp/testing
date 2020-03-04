import angular from 'angular'

angular.module('odin.api').factory('PasswordModifyRequest', PasswordModifyRequest )

PasswordModifyRequest .$inject = ['$http', 'Route']
function PasswordModifyRequest ($http, Route) {
  var service = {
    updatePasswords
  }
  var url = Route.api('/users/passwords')
  return service
 
 /*
  * this method used for user update self password
  * param used userId, oldPassword, newPassword
  * oldPassword is not required
 */

  function updatePasswords(user) {
    return $http.put(url(), user).then(response => response.data)
  }
 
}
