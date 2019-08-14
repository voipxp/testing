import angular from 'angular'
import get from 'lodash/get'

angular.module('odin.api').factory('GroupAutoAttendantService', GroupAutoAttendantService)

GroupAutoAttendantService.$inject = ['$http', 'Route']
function GroupAutoAttendantService($http, Route) {
  var url = Route.api('/groups/auto-attendants')

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
    types: ['Basic', 'Standard'],
    keys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '#'],
    actions: [
      'Transfer With Prompt',
      'Transfer Without Prompt',
      'Transfer To Operator',
      'Transfer To Submenu',
      'Name Dialing',
      'Extension Dialing',
      'Transfer To Mailbox',
      'Play Announcement',
      'Repeat Menu',
      'Exit'
    ],
    dialingEntries: ['LastName + FirstName', 'LastName + FirstName or FirstName + LastName'],
    dialingScopes: ['Group', 'Department', 'Enterprise'],
    announcementSelections: ['Default', 'Personal'],
    mediaTypes: ['WMA', 'WAV', '3GP', 'MOV']
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

  function store(aa) {
    return $http.post(url(), aa).then(function(response) {
      return response.data
    })
  }

  function status(aa) {
    return $http.put(url('status'), { instances: [aa] }).then(function(response) {
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

  function update(aa) {
    return $http.put(url(), aa).then(function(response) {
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
      'Exit': false
    }
    return map[get(key, 'action', key)]
  }

  function requiresAnnouncement(key) {
    return get(key, 'action', key) === 'Play Announcement'
  }

  function requiresSubmenu(key) {
    return get(key, 'action', key) === 'Transfer To Submenu'
  }
}
