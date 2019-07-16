import angular from 'angular'
import gql from 'graphql-tag'
import { loadUserViewableServices } from '@/store/user-viewable-services'

angular.module('odin.user').factory('UserPermissionService', Service)

const USER_SERVICES_ASSIGNED = gql`
  query userServicesAssigned($userId: String!) {
    userServicesAssigned(userId: $userId) {
      _id
      userId
      userServices {
        serviceName
        isActive
      }
    }
  }
`

Service.$inject = ['Module', 'ACL', '$q', '$ngRedux', 'apollo']
function Service(Module, ACL, $q, $ngRedux, apollo) {
  var service = { load: load }

  return service

  function load(userId, useCache) {
    return $q
      .all([
        loadAssigned(userId, useCache),
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
      switch (name) {
        case 'Call Center':
          return [
            'Call Center - Basic',
            'Call Center - Standard',
            'Call Center - Premium'
          ].find(service => isAssigned(name) && isViewable(name))
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
          ].find(service => isAssigned(service) && isViewable(service))
        default:
          return isAssigned(name) && isViewable(name)
      }
    }
  }

  function loadAssigned(userId, useCache = true) {
    return apollo
      .query({ query: USER_SERVICES_ASSIGNED, variables: { userId } })
      .then(({ data }) => data.userServicesAssigned)
  }

  // doesn't change often, use cache always
  function loadViewable(userId) {
    const services = $ngRedux.getState().userViewableServices[userId]
    return services
      ? $q.when(services)
      : $ngRedux.dispatch(loadUserViewableServices(userId))
  }

  function mapServices(assigned) {
    return assigned.userServices.reduce((obj, service) => {
      obj[service.serviceName] = true
      return obj
    }, {})
  }
}
