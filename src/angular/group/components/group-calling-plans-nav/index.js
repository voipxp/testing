import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallingPlansNav', {
  template,
  controller,
  bindings: {
    callingPlan: '@',
    module: '<',
    serviceProviderId: '<',
    groupId: '<'
  }
})

controller.$inject = ['ACL','Route']
function controller(ACL, Route) {
  var ctrl = this
  ctrl.open = open

  function open(callingPlan) { 
    if(ACL.is('Group') || ACL.is('Service Provider')){
      if(callingPlan){
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'calling-plans',
          callingPlan
        ).hash(null)
      }else{
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'comm-barring',
          'callingPlans'
        ).hash(null)
      }
    }else{
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callingPlans',
        callingPlan
      ).hash(null)
    }
  }
}
