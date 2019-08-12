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

  function toggle(service) {
    const editService = angular.copy(service)
    editService.assigned = !editService.assigned
    delete editService.description
    ctrl.loadingServices[editService.servicePackName] = true
    const singleService = { userId: ctrl.userId, servicePacks: [editService] }

    UserServiceService.update(singleService)
      .then(() => {
        const message = editService.assigned ? 'Assigned' : 'Unassigned'
        const action = editService.assigned
          ? Alert.notify.success
          : Alert.notify.warning
        action(`${editService.servicePackName} ${message}`)
      })
      .then(onInit)
      .catch(Alert.notify.danger)
      .finally(
        () => (ctrl.loadingServices[editService.servicePackName] = false)
      )
  }
}
