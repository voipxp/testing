;(function() {
  angular.module('odin.user').component('userCollaborateBridge', {
    templateUrl: 'user/components/collaborate/bridge.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserCollaborateService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      loadBridge()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadBridge() {
      return UserCollaborateService.bridge(ctrl.userId).then(function(data) {
        ctrl.bridge = data
      })
    }
  }
})()
