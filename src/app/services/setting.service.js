;(function() {
  angular.module('odin.app').factory('Setting', Setting)

  function Setting($http, Route, $rootScope) {
    var url = Route.api('ui', 'settings')
    var _data = {}
    var service = { load: load, data: data }
    $rootScope.$on('BrandingSettingService:updated', load)
    return service

    // get the UI settings and save in memory
    function load() {
      return $http.get(url()).then(function(response) {
        _data = _.isEmpty(response.data) ? {} : response.data
        $rootScope.$emit('Setting:updated')
      })
    }

    function data(property) {
      if (!property) return _data
      return _.get(_data, property)
    }
  }
})()
