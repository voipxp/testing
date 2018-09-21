;(function() {
  angular
    .module('odin.group')
    .factory('GroupAutoAttendantSubmenuService', Service)

  function Service($http, CacheFactory, Route, GroupAutoAttendantService) {
    var url = Route.api('/services/groups/autoattendants/submenus')
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

    function index(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function store(submenu) {
      return $http.post(url(), submenu).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(serviceUserId, submenuId) {
      return $http
        .get(url(), {
          params: { serviceUserId: serviceUserId, submenuId: submenuId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function usage(serviceUserId, submenuId) {
      return $http
        .get(url('usage'), {
          params: { serviceUserId: serviceUserId, submenuId: submenuId }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(submenu) {
      return $http.put(url(), submenu).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceUserId, submenuId) {
      return $http
        .delete(url(), {
          params: { serviceUserId: serviceUserId, submenuId: submenuId }
        })
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
