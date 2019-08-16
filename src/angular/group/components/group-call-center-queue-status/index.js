import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterQueueStatus', {
  template,
  controller,
  bindings: { serviceUserId: '=' }
})

controller.$inject = ['Alert', 'GroupCallCenterQueueStatusService']
function controller(Alert, GroupCallCenterQueueStatusService) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.refresh = activate
  ctrl.viewAgents = viewAgents
  ctrl.numberAgents = numberAgents

  function activate() {
    ctrl.loading = true
    loadStatus()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadStatus() {
    return GroupCallCenterQueueStatusService.show(ctrl.serviceUserId).then(function(data) {
      ctrl.status = data
      return data
    })
  }

  function numberAgents() {
    return (ctrl.status.agentsCurrentlyStaffed && ctrl.status.agentsCurrentlyStaffed.length) || 0
  }

  function viewAgents() {
    Alert.modal.open('groupCallCenterQueueStatusViewAgents')
  }
}
