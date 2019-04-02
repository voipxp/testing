import angular from 'angular'
import _ from 'lodash'

angular.module('odin.group').factory('GroupFlexibleSeatingHostService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/flexible-seating/host')

  var service = {
    index: index,
    store: store,
    show: show,
    update: update,
    destroy: destroy,
    status: status,
    requiresPhone: requiresPhone,
    requiresAnnouncement: requiresAnnouncement,
    requiresSubmenu: requiresSubmenu
  }

  service.options = {
    dialingScopes: ['Group', 'Department', 'Enterprise']
  }
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(object) {
    return $http.post(url(), object).then(function(response) {
      return response.data
    })
  }

  function status(object) {
    return $http
      .put(url('status'), { instances: [object] })
      .then(function(response) {
        return response.data
      })
  }

  function show(serviceUserId) {
    return $http
      .get(url(), {
        params: { serviceUserId: serviceUserId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceUserId) {
    return $http
      .delete(url(), {
        params: { serviceUserId: serviceUserId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function requiresPhone(key) {
    var map = {
      'Transfer With Prompt': true,
      'Transfer Without Prompt': true,
      'Transfer To Operator': true,
      'Transfer To Submenu': false,
      'Name Dialing': false,
      'Extension Dialing': false,
      'Transfer To Mailbox': false,
      'Play Announcement': false,
      'Repeat Menu': false,
      Exit: false
    }
    return map[_.get(key, 'action', key)]
  }

  function requiresAnnouncement(key) {
    return _.get(key, 'action', key) === 'Play Announcement'
  }

  function requiresSubmenu(key) {
    return _.get(key, 'action', key) === 'Transfer To Submenu'
  }
}
