;(function() {
  angular.module('odin.settings').factory('CallbackSettingService', Service)

  function Service($http, Route) {
    var url = Route.api('/callbacks')
    var service = { index, store, show, update, destroy }
    return service

    function index() {
      return $http.get(url()).then(res => res.data)
    }

    function store(settings) {
      return $http.post(url(), settings).then(res => res.data)
    }

    function show(id) {
      return $http.get(url(), { params: { id } }).then(res => res.data)
    }

    function update(id, settings) {
      return $http.put(url(), settings).then(res => res.data)
    }

    function destroy(id) {
      return $http.delete(url(), { params: { id } }).then(res => res.data)
    }
  }
})()
