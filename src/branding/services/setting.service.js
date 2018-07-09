;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingSettingService', BrandingSettingService)

  function BrandingSettingService($http, Route, $rootScope) {
    var service = { show: show, update: update }

    var route = Route.api('branding')

    return service

    function url(hostnameId) {
      return route(hostnameId, 'settings')
    }

    function show(hostnameId) {
      return $http.get(url(hostnameId)).then(function(response) {
        var data = response.data
        return _.isEmpty(data) ? {} : data
      })
    }

    function update(hostnameId, template) {
      return $http.put(url(hostnameId), template).then(function(response) {
        $rootScope.$emit('BrandingSettingService:updated')
        return response.data
      })
    }
  }
})()
