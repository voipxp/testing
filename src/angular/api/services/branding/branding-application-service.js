import angular from 'angular'

angular.module('odin.api').factory('BrandingApplicationService', BrandingApplicationService)

BrandingApplicationService.$inject = ['$http', 'Route', '$rootScope']
function BrandingApplicationService($http, Route, $rootScope) {
  var service = { index, store, show, update, destroy }
  var url = Route.api('/branding/applications')

  return service

  function index(hostnameId) {
    return $http.get(url(), { params: { hostnameId } }).then(response => response.data)
  }

  function store(application) {
    return $http.post(url(), application).then(response => {
      $rootScope.$emit('BrandingApplicationService:updated')
      return response.data
    })
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(application) {
    return $http.put(url(), application).then(response => {
      $rootScope.$emit('BrandingApplicationService:updated')
      return response.data
    })
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => {
      $rootScope.$emit('BrandingApplicationService:updated')
      return response.data
    })
  }
}
