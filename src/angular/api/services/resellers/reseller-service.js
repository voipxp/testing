import angular from 'angular'
angular.module('odin.api').factory('ResellerService', Service)
Service.$inject = ['$http', 'Route']

function Service($http, Route) {
  var url = Route.api('/resellers')
  var service = { index, store, update, destroy }

  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(reseller) {
    return $http.post(url(), reseller).then(response => {
      return response.data
    })
  }

  function update(reseller) {
    return $http.put(url(), reseller).then(response => {
      return response.data
    })
  }

  function destroy(resellerId) {
    return $http.delete(url(), { params: { resellerId } }).then(response => {
      return response.data
    })
  }
}
