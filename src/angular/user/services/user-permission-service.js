import angular from 'angular'
import _ from 'lodash'

angular.module('odin.user').factory('UserPermissionService', Service)

Service.$inject = ['Module', 'UserServiceService', 'ACL', '$q']
function Service(Module, UserServiceService, ACL, $q) {
  var service = { load: load }
  return service

  function load(userId) {
    console.log('UserPermissionService.load(userId)')
    return $q
      .all([loadAssigned(userId), loadViewable(userId), Module.load()])
      .then(function(response) {
        return Permission(response[0], response[1])
      })
  }

  function Permission(_assigned, _viewable) {
    var _assignedMap = mapServices(_assigned)
    var _viewableMap = mapServices(_viewable)

    var service = {
      assigned,
      viewable,
      create,
      read,
      update,
      destroy,
      isAssigned
    }
    return service

    function assigned() {
      return _assigned.userServices
    }

    function viewable() {
      return _viewable.userServices
    }

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
      return !!_assignedMap[name]
    }

    function isViewable(name) {
      return ACL.has('Group') || !!_viewableMap[name]
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
            return isAssigned(service) && isViewable(service)
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
            return isAssigned(service) && isViewable(service)
          }
        )
      } else if (name === 'Premium Call Records') {
        return true
      } else {
        return isAssigned(name) && isViewable(name)
      }
    }
  }

  function loadAssigned(userId) {
    return UserServiceService.assigned(userId)
  }

  function loadViewable(userId) {
    return UserServiceService.viewable(userId)
  }

  function mapServices(assigned) {
    var services = {}
    assigned.userServices.forEach(function(service) {
      services[service.serviceName] = true
    })
    return services
  }
}
