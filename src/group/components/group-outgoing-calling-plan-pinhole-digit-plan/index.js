import angular from 'angular'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupOutgoingCallingPlanPinholeDigitPlan', {
    template,
    controller
  })

controller.$inject = ['$routeParams', 'GroupServiceService']
function controller($routeParams, GroupServiceService) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId

  ctrl.$onInit = onInit

  function onInit() {
    GroupServiceService.available(ctrl.serviceProviderId, ctrl.groupId).then(
      function(assigned) {
        ctrl.hasCallMeNow = assigned['Call Me Now']
      }
    )
  }
}
