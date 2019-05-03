import angular from 'angular'
import template from './index.html'
import { loadUserServices, updateUserServices } from '@/store/user-services'

angular.module('odin.user').component('userServices', {
  template,
  controller,
  bindings: { serviceType: '<', userId: '<', onUpdate: '&' }
})

controller.$inject = ['Alert', '$filter', 'EventEmitter', '$ngRedux']
function controller(Alert, $filter, EventEmitter, $ngRedux) {
  const ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = onDestroy
  ctrl.toggle = toggle
  ctrl.filterService = filterService

  let unsubscribe

  ctrl.loadingServices = {}

  function onInit() {
    ctrl.title = $filter('humanize')(ctrl.serviceType)
    const mapState = state => ({ services: state.userServices[ctrl.userId] })
    unsubscribe = $ngRedux.connect(mapState)(this)
    $ngRedux.dispatch(loadUserServices(ctrl.userId))
  }

  function onDestroy() {
    if (unsubscribe) unsubscribe()
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

    $ngRedux
      .dispatch(updateUserServices(singleService))
      .then(() => {
        const message = service.assigned ? 'Assigned' : 'Unassigned'
        const action = service.assigned
          ? Alert.notify.success
          : Alert.notify.warning
        action(`${service.serviceName} ${message}`)
        sendUpdate(singleService)
      })
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loadingServices[service.serviceName] = false))
  }

  function sendUpdate(service) {
    ctrl.onUpdate(EventEmitter({ userId: ctrl.userId, service: service }))
  }
}
