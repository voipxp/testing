;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingHostnameService', BrandingHostnameService)

  function BrandingHostnameService($http, Route, $rootScope) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }

    var url = Route.api('branding')

    return service

    function index() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }

    function store(hostname) {
      return $http.post(url(), hostname).then(function(response) {
        $rootScope.$emit('BrandingHostnameService:updated')
        return response.data
      })
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(hostname) {
      return $http.put(url(hostname.id), hostname).then(function(response) {
        $rootScope.$emit('BrandingHostnameService:updated')
        return response.data
      })
    }

    function destroy(hostname) {
      return $http.delete(url(hostname.id)).then(function(response) {
        $rootScope.$emit('BrandingHostnameService:updated')
        return response.data
      })
    }
  }
})()
