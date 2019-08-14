import angular from 'angular'

angular.module('odin.api').factory('CallbackSettingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/callbacks')
  var service = { index, store, show, update, destroy }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(settings) {
    return $http.post(url(), settings).then(response => response.data)
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(id, settings) {
    return $http.put(url(), settings).then(response => response.data)
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => response.data)
  }
}
