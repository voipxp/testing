import angular from 'angular'

angular
  .module('odin.api')
  .factory('BrandingHostnameService', BrandingHostnameService)

BrandingHostnameService.$inject = ['$http', 'Route', '$rootScope']
function BrandingHostnameService($http, Route, $rootScope) {
  var service = { index, store, show, update, destroy, clone }

  var url = Route.api('/branding/hostnames')

  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }

  function store(hostname) {
    return $http.post(url(), hostname).then(response => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return response.data
    })
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(response => response.data)
  }

  function update(hostname) {
    return $http.put(url(), hostname).then(response => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return response.data
    })
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(response => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return response.data
    })
  }

  function clone(id, hostname) {
    return $http.post(url('clone'), { id, hostname }).then(response => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return response.data
    })
  }
}
