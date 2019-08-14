import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlanPinholeDigitPlan', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['GroupServiceService']
function controller(GroupServiceService) {
  var ctrl = this

  ctrl.$onInit = onInit

  function onInit() {
    GroupServiceService.available(ctrl.serviceProviderId, ctrl.groupId).then(function(assigned) {
      ctrl.hasCallMeNow = assigned['Call Me Now']
    })
  }
}
