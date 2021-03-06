import angular from 'angular'
import template from './index.html'

angular
  .module('odin.user')
  .component('userOutgoingCallingPlanPinholeDigitPlan', {
    template,
    controller,
    bindings: { userId: '<' }
  })

controller.$inject = ['Alert', 'UserPermissionService']
function controller(Alert, UserPermissionService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    UserPermissionService.load(ctrl.userId)
      .then(function(permissions) {
        ctrl.showCallMeNow = permissions.isAssigned('Call Me Now')
      })
      .catch(Alert.notify.danger)
  }
}
