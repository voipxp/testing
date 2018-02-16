;(function() {
  angular.module('odin.user').component('userBasicCallLogsPanel', {
    templateUrl:
      'user/components/basicCallLogs/basicCallLogsPanel.component.html',
    bindings: {
      userId: '<',
      serviceProviderId: '<',
      groupId: '<',
      limitTo: '<'
    },
    controller: Controller
  })

  function Controller(UserBasicCallLogService, Alert, Route) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.open = open

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
      Route.open('users', ctrl.serviceProviderId, ctrl.groupId, ctrl.userId)(
        'basicCallLogs'
      )
    }
  }
})()
