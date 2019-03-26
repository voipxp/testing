import angular from 'angular'

angular
  .module('odin.branding')
  .factory('BrandingHostnameService', BrandingHostnameService)

BrandingHostnameService.$inject = ['$http', 'Route', '$rootScope']
function BrandingHostnameService($http, Route, $rootScope) {
  var service = { index, store, show, update, destroy, clone }

  var url = Route.api('/branding/hostnames')

  return service

  function index() {
    return $http.get(url()).then(res => res.data)
  }

  function store(hostname) {
    return $http.post(url(), hostname).then(res => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return res.data
    })
  }

  function show(id) {
    return $http.get(url(), { params: { id } }).then(res => res.data)
  }

  function update(hostname) {
    return $http.put(url(), hostname).then(res => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return res.data
    })
  }

  function destroy(id) {
    return $http.delete(url(), { params: { id } }).then(res => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return res.data
    })
  }

  function clone(id, hostname) {
    return $http.post(url('clone'), { id, hostname }).then(res => {
      $rootScope.$emit('BrandingHostnameService:updated')
      return res.data
    })
  }
}
