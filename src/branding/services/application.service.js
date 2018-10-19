;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingApplicationService', BrandingApplicationService)

  function BrandingApplicationService($http, Route, $rootScope) {
    var service = { index, store, show, update, destroy }
    var url = Route.api2('/branding/applications')

    return service

    function index(hostnameId) {
      return $http.get(url(), { params: { hostnameId } }).then(res => res.data)
    }

    function store(application) {
      return $http.post(url(), application).then(res => {
        $rootScope.$emit('BrandingApplicationService:updated')
        return res.data
      })
    }

    function show(id) {
      return $http.get(url(), { params: { id } }).then(res => res.data)
    }

    function update(application) {
      return $http.put(url(), application).then(res => {
        $rootScope.$emit('BrandingApplicationService:updated')
        return res.data
      })
    }

    function destroy(id) {
      return $http.delete(url(), { params: { id } }).then(res => {
        $rootScope.$emit('BrandingApplicationService:updated')
        return res.data
      })
    }
  }
})()
