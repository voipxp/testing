;(function() {
  angular.module('odin.group').component('groupCallCenterQueueStatus', {
    templateUrl:
      'group/components/callCenters/callCenter/statistics/queueStatus.component.html',
    controller: Controller,
    bindings: { serviceUserId: '=' }
  })

  function Controller(Alert, GroupCallCenterQueueStatusService) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.refresh = activate
    ctrl.viewAgents = viewAgents
    ctrl.numAgents = numAgents

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
      return GroupCallCenterQueueStatusService.show(ctrl.serviceUserId).then(
        function(data) {
          console.log('status', data)
          ctrl.status = data
          return data
        }
      )
    }

    function numAgents() {
      return (
        (ctrl.status.agentsCurrentlyStaffed &&
          ctrl.status.agentsCurrentlyStaffed.length) ||
        0
      )
    }

    function viewAgents() {
      Alert.modal.open('groupCallCenterQueueStatusViewAgents')
    }
  }
})()
