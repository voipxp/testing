;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserSequentialRingServiceCriteria',
      UserSequentialRingServiceCriteria
    )

  function UserSequentialRingServiceCriteria($http, Route) {
    var url = Route.api('/services/users/sequentialring')
    var service = {
      show: show,
      update: update,
      index: index,
      post: post,
      destroy: destroy
    }
    service.options = {
      fromDnCriteriaSelection: ['Any', 'Specified Only']
    }
    return service

    function show(userId, name) {
      return $http
        .get(url(userId) + '/criteria/' + name)
        .then(function(response) {
          return response.data
        })
    }

    function index(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, name, obj) {
      return $http
        .put(url(userId) + '/criteria/' + name, obj)
        .then(function(response) {
          return response.data
        })
    }
    function post(userId, obj) {
      return $http
        .post(url(userId) + '/criteria', obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(userId, name, obj) {
      return $http
        .delete(url(userId) + '/criteria/' + name, obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
