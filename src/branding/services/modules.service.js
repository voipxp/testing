;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingModuleService', BrandingModuleService)

  function BrandingModuleService($http, Route, $rootScope) {
    var service = {
      index: index,
      show: show,
      update: update
    }

    var route = Route.api('branding')

    return service

    function url(hostnameId, module) {
      var id = (module && module.id) || module
      return route(hostnameId, 'modules', id)
    }

    function index(hostnameId) {
      return $http.get(url(hostnameId)).then(function(response) {
        return response.data
      })
    }

    function show(hostnameId, module) {
      return $http.get(url(hostnameId, module)).then(function(response) {
        return response.data
      })
    }

    function update(hostnameId, module) {
      return $http
        .put(url(hostnameId, module), module)
        .then(function(response) {
          $rootScope.$emit('BrandingModuleService:updated')
          return response.data
        })
    }
  }
})()
