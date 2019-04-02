;(function() {
  angular.module('odin.user').component('userOutgoingCallingPlan', {
    templateUrl:
      'user/components/callingPlans/outgoing/outgoing.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserPermissionService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      UserPermissionService.load(ctrl.userId)
        .then(function(permissions) {
          ctrl.showCallMeNow = permissions.assigned('Call Me Now')
        })
        .catch(Alert.notify.danger)
    }
  }
})()
