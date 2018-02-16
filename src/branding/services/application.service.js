;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingApplicationService', BrandingApplicationService)

  function BrandingApplicationService($http, Route, $rootScope) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }

    var route = Route.api('branding')

    return service

    function url(hostnameId, application) {
      var id = (application && application.id) || application
      return route(hostnameId, 'applications', id)
    }

    function index(hostnameId) {
      return $http.get(url(hostnameId)).then(function(response) {
        return response.data
      })
    }

    function store(hostnameId, application) {
      return $http.post(url(hostnameId), application).then(function(response) {
        $rootScope.$emit('BrandingApplicationService:updated')
        return response.data
      })
    }

    function show(hostnameId, application) {
      return $http.get(url(hostnameId, application)).then(function(response) {
        return response.data
      })
    }

    function update(hostnameId, application) {
      return $http
        .put(url(hostnameId, application), application)
        .then(function(response) {
          $rootScope.$emit('BrandingApplicationService:updated')
          return response.data
        })
    }

    function destroy(hostnameId, application) {
      return $http
        .delete(url(hostnameId, application))
        .then(function(response) {
          $rootScope.$emit('BrandingApplicationService:updated')
          return response.data
        })
    }
  }
})()
