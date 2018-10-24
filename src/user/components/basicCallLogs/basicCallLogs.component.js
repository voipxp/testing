;(function() {
  angular.module('odin.user').component('userBasicCallLogs', {
    templateUrl: 'user/components/basicCallLogs/basicCallLogs.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserBasicCallLogService, Module, $q) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      ctrl.tab = 'placed'
      $q.all([loadLogs(), loadModule()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Basic Call Logs').then(function(data) {
        ctrl.module = data
      })
    }

    function loadLogs() {
      return UserBasicCallLogService.show(ctrl.userId).then(function(data) {
        ctrl.logs = data
      })
    }
  }
})()
