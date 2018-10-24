;(function() {
  angular.module('odin.common').factory('SystemFileService', Service)

  function Service($http, CacheFactory, Route) {
    var url = Route.api('/system/files')
    var service = { show }
    return service

    function show(fileName) {
      return $http.get(url(), { params: { fileName } }).then(res => res.data)
    }
  }
})()
