import angular from 'angular'

angular
  .module('odin.user')
  .factory('UserPushToTalkService', UserPushToTalkService)

UserPushToTalkService.$inject = ['$http', 'Route']
function UserPushToTalkService($http, Route) {
  var url = Route.api('/users/push-to-talk')
  var service = {
    show: show,
    update: update,
    users: users
  }
  service.options = {
    outgoingConnectionSelection: ['One Way', 'Two Way'],
    accessListSelection: [
      'Allow Calls From Selected Users',
      'Allow Calls From Everyone Except Selected Users'
    ]
  }
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function users(userId) {
    return $http
      .get(url('users'), { params: { userId: userId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
