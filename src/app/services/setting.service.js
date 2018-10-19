;(function() {
  angular.module('odin.app').factory('Setting', Setting)

  function Setting($http, Route, $rootScope) {
    var url = Route.api2('/ui/settings')
    var _data = {}
    var service = { load, data }
    $rootScope.$on('BrandingSettingService:updated', load)
    return service

    // get the UI settings and save in memory
    function load() {
      return $http.get(url()).then(res => {
        _data = _.isEmpty(res.data) ? {} : res.data
        $rootScope.$emit('Setting:updated')
      })
    }

    function data(property) {
      if (!property) return _data
      return _.get(_data, property)
    }
  }
})()
