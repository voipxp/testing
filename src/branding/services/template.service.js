;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingTemplateService', BrandingTemplateService)

  function BrandingTemplateService($http, Route, $rootScope) {
    var service = { show: show, update: update }

    var route = Route.api('branding')

    return service

    function url(hostnameId) {
      return route(hostnameId, 'template')
    }

    function show(hostnameId) {
      return $http.get(url(hostnameId)).then(function(response) {
        return response.data
      })
    }

    function update(hostnameId, template) {
      return $http.put(url(hostnameId), template).then(function(response) {
        $rootScope.$emit('BrandingTemplateService:updated')
        return response.data
      })
    }
  }
})()
