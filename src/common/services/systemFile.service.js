;(function() {
  angular.module('odin.common').factory('SystemFileService', Service)

  function Service($http, CacheFactory, Route) {
    var url = Route.api('/system/files')
    var service = { show: show }
    return service

    function show(fileName) {
      var params = { fileName: fileName }
      return $http.get(url(), { params: params }).then(function(response) {
        return response.data
      })
    }
  }
})()
