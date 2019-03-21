;(function() {
  angular
    .module('odin.group')
    .factory('GroupFlexibleSeatingHostService', GroupFlexibleSeatingHostService)

  function GroupFlexibleSeatingHostService($http, Route) {
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

    function store(obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function status(obj) {
      return $http
        .put(url('status'), { instances: [obj] })
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

    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
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
})()
