import angular from 'angular'

angular.module('odin.api').factory('GroupAutoAttendantSubmenuService', Service)

Service.$inject = ['$http', 'Route', 'GroupAutoAttendantService']
function Service($http, Route, GroupAutoAttendantService) {
  var url = Route.api('/groups/auto-attendants/submenus')
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
      return response.data
    })
  }

  function show(serviceUserId, submenuId) {
    return $http
      .get(url(), { params: { serviceUserId, submenuId } })
      .then(response => response.data)
  }

  function usage(serviceUserId, submenuId) {
    return $http
      .get(url('usage'), { params: { serviceUserId, submenuId } })
      .then(response => response.data)
  }

  function update(submenu) {
    return $http.put(url(), submenu).then(response => response.data)
  }

  function destroy(serviceUserId, submenuId) {
    return $http
      .delete(url(), { params: { serviceUserId, submenuId } })
      .then(response => response.data)
  }
}
