;(function() {
  angular.module('odin.app').factory('Template', Template)

  function Template($http, Route, $rootScope) {
    var url = Route.api2('/ui/templates')
    var _data = {}
    var service = { load, data }
    $rootScope.$on('BrandingTemplateService:updated', load)
    return service

    // get the UI template and save in memory
    function load() {
      return $http.get(url()).then(res => {
        _data = res.data || {}
        $rootScope.$emit('Template:updated')
      })
    }

    function data(property) {
      if (!property) return _data
      return _.get(_data, property)
    }
  }
})()
