import angular from 'angular'

angular.module('odin.api').factory('GroupPermissionService', Service)

Service.$inject = ['Module', 'GroupServiceService', '$q']
function Service(Module, GroupServiceService, $q) {
  var service = { load: load }
  return service

  function load(serviceProviderId, groupId) {
    return $q
      .all([loadAssigned(serviceProviderId, groupId), Module.load()])
      .then(function(response) {
        return Permission(serviceProviderId, groupId, response[0])
      })
  }

  function Permission(serviceProviderId, groupId, _assigned) {
    var service = {
      create: create,
      read: read,
      update: update,
      destroy: destroy
    }
    return service

    function create(name) {
      return has(name) && Module.create(name)
    }

    function read(name) {
      return has(name) && Module.read(name)
    }

    function update(name) {
      return has(name) && Module.update(name)
    }

    function destroy(name) {
      return has(name) && Module.destroy(name)
    }

    function isAssigned(name) {
      return !!_assigned[name]
    }

    function has(name) {
      if (!name) return
      name = name.serviceName || name.name || name
      switch (name) {
        case 'Call Center':
          return [
            'Call Center - Basic',
            'Call Center - Standard',
            'Call Center - Premium'
          ].find(isAssigned)
        case 'Shared Call Appearance':
          return [
            'Shared Call Appearance',
            'Shared Call Appearance 5',
            'Shared Call Appearance 10',
            'Shared Call Appearance 15',
            'Shared Call Appearance 20',
            'Shared Call Appearance 25',
            'Shared Call Appearance 30',
            'Shared Call Appearance 35'
          ].find(isAssigned)
        case 'Auto Attendant':
          return [
            'Auto Attendant',
            'Auto Attendant - Standard',
            'Auto Attendant - Video'
          ].find(isAssigned)
        case 'Group Calling Plans':
          return [
            'Outgoing Calling Plan',
            'Enhanced Outgoing Calling Plan',
            'Incoming Calling Plan'
          ].find(isAssigned)
        default:
          return isAssigned(name)
      }
    }
  }

  function loadAssigned(serviceProviderId, groupId) {
    return GroupServiceService.available(serviceProviderId, groupId)
  }
}
