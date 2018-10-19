;(function() {
  angular
    .module('odin.branding')
    .factory('BrandingTemplateService', BrandingTemplateService)

  function BrandingTemplateService($http, Route, $rootScope) {
    var service = { show, update }
    var url = Route.api2('/branding/templates')
    return service

    function show(hostnameId) {
      return $http.get(url(), { params: { hostnameId } }).then(res => res.data)
    }

    function update(template) {
      return $http.put(url(), template).then(res => {
        $rootScope.$emit('BrandingTemplateService:updated')
        return res.data
      })
    }
  }
})()
