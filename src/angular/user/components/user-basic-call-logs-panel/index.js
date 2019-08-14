import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userBasicCallLogsPanel', {
  template,
  controller,
  bindings: {
    userId: '<',
    serviceProviderId: '<',
    groupId: '<',
    limitTo: '<'
  }
})

controller.$inject = ['UserBasicCallLogService', 'Alert', 'Route']
function controller(UserBasicCallLogService, Alert, Route) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.onPagination = onPagination

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function onInit() {
    ctrl.loading = true
    ctrl.tab = 'placed'
    loadCalls()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadCalls() {
    return UserBasicCallLogService.show(ctrl.userId).then(function(data) {
      ctrl.calls = data
    })
  }

  function open() {
    Route.open('users', ctrl.serviceProviderId, ctrl.groupId, ctrl.userId, 'basicCallLogs')
  }
}
