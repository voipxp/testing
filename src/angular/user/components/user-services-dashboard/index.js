import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import allowedServices from './routes'

angular.module('odin.user').component('userServicesDashboard', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserPermissionService',
  'Module',
  '$q',
  '$window'
]
function controller(Alert, UserPermissionService, Module, $q, $window) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.module = Module
  ctrl.select = select

  ctrl.columns = [
    {
      key: 'alias',
      label: 'Name'
    },
    {
      key: 'description',
      label: 'Description'
    },
    {
      key: 'isActive',
      label: 'Active',
      type: 'boolean',
      align: 'centered'
    }
  ]

  function onInit() {
    return $q
      .all([loadServices(), Module.load()])
      .then(() => loadServices(false))
      .catch(Alert.notify.danger)
  }

  function select(service) {
    const name = _.get(service, 'serviceName')
    ctrl.selectedService = name ? allowedServices[name].component : null
    if (!ctrl.selectedService) loadServices(false)
    $window.scrollTo(0, 0)
  }

  function loadServices(useCache) {
    return UserPermissionService.load(ctrl.userId, useCache).then(
      Permission => {
        const services = Permission.assigned()
          .filter(service => {
            const allowed = allowedServices[service.serviceName]
            return (
              allowed && Permission.read(allowed.module || service.serviceName)
            )
          })
          .map(service => {
            const allowed = allowedServices[service.serviceName]
            const serviceName = allowed.module || service.serviceName
            return {
              ...service,
              alias: Module.alias(serviceName),
              description: Module.description(serviceName),
              isActive: service.isActive
            }
          })
        // remove dups such as Call Center - Basic and Call Center - Standard
        ctrl.services = _.uniqBy(services, service => {
          const allowed = allowedServices[service.serviceName]
          return allowed.module || service.serviceName
        })
      }
    )
  }
}
