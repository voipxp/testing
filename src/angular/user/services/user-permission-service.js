import angular from 'angular'
import _ from 'lodash'
import { loadUserServices } from '@/store/user-services'
import { loadUserViewableServices } from '@/store/user-viewable-services'

angular.module('odin.user').factory('UserPermissionService', Service)

Service.$inject = ['Module', 'UserServiceService', 'ACL', '$q', '$ngRedux']
function Service(Module, UserServiceService, ACL, $q, $ngRedux) {
  var service = { load: load }

  return service

  function load(userId, useCache) {
    return $q
      .all([
        loadServices(userId, useCache),
        loadViewable(userId),
        Module.load()
      ])
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

  function loadServices(userId, useCache = true) {
    const services = $ngRedux.getState().userServices[userId]
    return useCache && services
      ? $q.when(services)
      : $ngRedux.dispatch(loadUserServices(userId))
  }

  // doesn't change often, use cache always
  function loadViewable(userId) {
    const services = $ngRedux.getState().userViewableServices[userId]
    return services
      ? $q.when(services)
      : $ngRedux.dispatch(loadUserViewableServices(userId))
  }

  function mapServices(assigned) {
    var services = {}
    assigned.userServices.forEach(function(service) {
      if (service.assigned) {
        services[service.serviceName] = true
      }
    })
    return services
  }
}
