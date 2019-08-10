import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userServicePacks', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', '$filter', 'UserServiceService']
function controller(Alert, $filter, UserServiceService) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.toggle = toggle
  ctrl.filterService = filterService

  ctrl.loadingServices = {}

  function onInit() {
    UserServiceService.show(ctrl.userId)
      .then(data => (ctrl.servicePacks = data.servicePacks))
      .catch(Alert.error)
  }

  function filterService(item) {
    if (item.isLoading) return true
    if (!ctrl.filter) return true
    if (ctrl.filter === 'assigned') return item.assigned
    if (ctrl.filter === 'unassigned') return !item.assigned
  }

  function toggle(editService) {
    const service = angular.copy(editService)
    service.assigned = !service.assigned
    ctrl.loadingServices[service.serviceName] = true
    // format as an array to fit API requirements
    const singleService = { userId: ctrl.userId }
    singleService[ctrl.serviceType] = [service]

    UserServiceService.update(singleService)
      .then(() => {
        const message = service.assigned ? 'Assigned' : 'Unassigned'
        const action = service.assigned
          ? Alert.notify.success
          : Alert.notify.warning
        action(`${service.serviceName} ${message}`)
      })
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loadingServices[service.serviceName] = false))
  }
}
