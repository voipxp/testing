import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlan', {
  template,
  controller
})

controller.$inject = ['$routeParams', 'GroupServiceService', 'Module']
function controller($routeParams, GroupServiceService, Module) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.$onInit = onInit

  function onInit() {
    Module.show('Outgoing Calling Plan').then(function(module) {
      ctrl.module = module
    })
    GroupServiceService.available(ctrl.serviceProviderId, ctrl.groupId).then(
      function(assigned) {
        ctrl.hasCallMeNow = assigned['Call Me Now']
      }
    )
  }
}
