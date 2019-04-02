;(function() {
  angular.module('odin.user').component('userOutgoingCallingPlanDigitPlan', {
    templateUrl:
      'user/components/callingPlans/digitPlan/digitPlan.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(UserPermissionService, Alert) {
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
