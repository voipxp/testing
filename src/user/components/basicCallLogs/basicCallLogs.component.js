;(function() {
  angular.module('odin.user').component('userBasicCallLogs', {
    templateUrl: 'user/components/basicCallLogs/basicCallLogs.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, $routeParams, UserBasicCallLogService) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      ctrl.tab = 'placed'
      loadLogs()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadLogs() {
      return UserBasicCallLogService.show(ctrl.userId).then(function(data) {
        console.log('logs', data)
        ctrl.logs = data
      })
    }
  }
})()
