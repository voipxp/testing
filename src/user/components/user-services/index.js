import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userServices', {
  template,
  controller,
  bindings: { serviceType: '@', userId: '<', onUpdate: '&' }
})

controller.$inject = ['Alert', 'UserServiceService', '$filter', 'EventEmitter']
function controller(Alert, UserServiceService, $filter, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.toggle = toggle
  ctrl.filterService = filterService

  function onInit() {
    ctrl.title = $filter('humanize')(ctrl.serviceType)
    ctrl.loading = true
    return loadServices()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function filterService(item) {
    if (item.isLoading) return true
    if (!ctrl.filter) return true
    if (ctrl.filter === 'assigned') return item.assigned
    if (ctrl.filter === 'unassigned') return !item.assigned
  }

  function loadServices() {
    return UserServiceService.show(ctrl.userId).then(function(data) {
      ctrl.services = data[ctrl.serviceType]
    })
  }

  function toggle(service) {
    service.isLoading = true

    // format as an array to fit API requirements
    var singleService = {
      userId: ctrl.userId
    }
    singleService[ctrl.serviceType] = [service]

    // Update service
    UserServiceService.update(singleService)
      .then(function() {
        var message = service.assigned ? 'Assigned' : 'Unassigned'
        var action = service.assigned
          ? Alert.notify.success
          : Alert.notify.warning
        action(service.serviceName + ' ' + message)
        sendUpdate(singleService)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        service.assigned = !service.assigned
      })
      .finally(function() {
        service.isLoading = false
      })
  }

  function sendUpdate(service) {
    ctrl.onUpdate(EventEmitter({ userId: ctrl.userId, service: service }))
  }
}
