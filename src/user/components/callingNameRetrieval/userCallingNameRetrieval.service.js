;(function() {
  angular
    .module('odin.user')
    .factory('UserCallingNameRetrievalService', UserCallingNameRetrievalService)

  function UserCallingNameRetrievalService($http, Route) {
    var url = Route.api('/services/users/callingnameretrieval')
    var service = { show: show, update: update }
    return service

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
