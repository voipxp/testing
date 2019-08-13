import angular from 'angular'
import gql from 'graphql-tag'

angular.module('odin.user').factory('UserPermissionService', Service)

const USER_SERVICES = gql`
  query userServicesAssignedAndViewable($userId: String!) {
    userServicesAssigned(userId: $userId) {
      _id
      userId
      userServices {
        serviceName
        isActive
      }
    }
    userServicesViewable(userId: $userId) {
      _id
      userId
      userServices {
        serviceName
      }
    }
  }
`

Service.$inject = ['Module', 'ACL', '$q', 'GraphQL']
function Service(Module, ACL, $q, GraphQL) {
  const service = { load: load }
  return service

  function load(userId, useCache) {
    return loadServices(userId).then(function(data) {
      return Permission(data.userServicesAssigned, data.userServicesViewable)
    })
  }

  function Permission(_assigned, _viewable) {
    const _assignedMap = mapServices(_assigned)
    const _viewableMap = mapServices(_viewable)

    const service = {
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

  function loadServices(userId) {
    return GraphQL.query({ query: USER_SERVICES, variables: { userId } }).then(
      ({ data }) => data
    )
  }

  function mapServices(assigned = { userServices: [] }) {
    return assigned.userServices.reduce((obj, service) => {
      obj[service.serviceName] = true
      return obj
    }, {})
  }
}
