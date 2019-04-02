import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userOutgoingCallingPlanDigitPlan', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['UserPermissionService', 'Alert']
function controller(UserPermissionService, Alert) {
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
