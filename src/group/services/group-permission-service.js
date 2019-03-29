import angular from 'angular'
import _ from 'lodash'

angular.module('odin.group').factory('GroupPermissionService', Service)

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
      // TEMP HACK until #290
      if (name === 'Call Center') {
        return _.find(
          [
            'Call Center - Basic',
            'Call Center - Standard',
            'Call Center - Premium'
          ],
          function(service) {
            return isAssigned(service)
          }
        )
      } else if (name === 'Shared Call Appearance') {
        return _.find(
          [
            'Shared Call Appearance',
            'Shared Call Appearance 5',
            'Shared Call Appearance 10',
            'Shared Call Appearance 15',
            'Shared Call Appearance 20',
            'Shared Call Appearance 25',
            'Shared Call Appearance 30',
            'Shared Call Appearance 35'
          ],
          function(service) {
            return isAssigned(service)
          }
        )
      } else if (name === 'Auto Attendant') {
        return _.find(
          [
            'Auto Attendant',
            'Auto Attendant - Standard',
            'Auto Attendant - Video'
          ],
          function(service) {
            return isAssigned(service)
          }
        )
      } else if (name === 'Group Calling Plans') {
        return _.find(
          [
            'Outgoing Calling Plan',
            'Enhanced Outgoing Calling Plan',
            'Incoming Calling Plan'
          ],
          function(service) {
            return isAssigned(service)
          }
        )
      } else {
        return isAssigned(name)
      }
    }
  }

  function loadAssigned(serviceProviderId, groupId) {
    return GroupServiceService.available(serviceProviderId, groupId)
  }
}
