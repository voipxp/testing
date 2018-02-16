;(function() {
  angular
    .module('odin.user')
    .factory('UserPushToTalkService', UserPushToTalkService)

  function UserPushToTalkService($http, Route) {
    var url = Route.api('/services/users/pushtotalk')
    var service = {
      show: show,
      update: update,
      index: index,
      availableusers: availableusers
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
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }
    function availableusers(userId) {
      return $http
        .get(url(userId) + '/availableusers')
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        console.log(response.data)
        return response.data
      })
    }
  }
})()
