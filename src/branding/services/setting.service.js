;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingSettingService', BrandingSettingService)

  function BrandingSettingService($http, Route, $rootScope) {
    var service = { show, update }
    var url = Route.api('/branding/settings')
    return service

    function show(hostnameId) {
      return $http.get(url(), { params: { hostnameId } }).then(res => {
        return _.isEmpty(res.data) ? {} : res.data
      })
    }

    function update(template) {
      return $http.put(url(), template).then(res => {
        $rootScope.$emit('BrandingSettingService:updated')
        return res.data
      })
    }
  }
})()
