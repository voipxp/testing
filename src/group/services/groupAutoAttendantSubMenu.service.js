;(function() {
  angular
    .module('odin.group')
    .factory('GroupAutoAttendantSubmenuService', Service)

  function Service($http, CacheFactory, Route, GroupAutoAttendantService) {
    var route = Route.api('/services/groups/autoattendants')
    var cache = CacheFactory('GroupAutoAttendantSubmenuService')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      usage: usage
    }

    service.options = angular.copy(GroupAutoAttendantService.options)
    service.options.actions.push('Return to Previous Menu')

    return service

    function url(serviceUserId, submenuId, extra) {
      return route(serviceUserId, 'submenus', submenuId, extra)
    }

    function index(serviceUserId) {
      return $http
        .get(url(serviceUserId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceUserId, submenu) {
      return $http.post(url(serviceUserId), submenu).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(serviceUserId, submenuId) {
      return $http.get(url(serviceUserId, submenuId)).then(function(response) {
        return response.data
      })
    }

    function usage(serviceUserId, submenuId) {
      return $http
        .get(url(serviceUserId, submenuId, 'usage'), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, submenuId, submenu) {
      return $http
        .put(url(serviceUserId, submenuId), submenu)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceUserId, submenuId) {
      return $http
        .delete(url(serviceUserId, submenuId))
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
