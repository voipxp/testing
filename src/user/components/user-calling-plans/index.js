import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCallingPlans', {
  template,
  controller,
  bindings: {
    userId: '<',
    groupId: '<',
    serviceProviderId: '<'
  }
})

controller.$inject = ['$window', 'GroupPermissionService', 'Alert']
function controller($window, GroupPermissionService, Alert) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select

  ctrl.plans = [
    {
      name: 'Incoming Calling Plan',
      service: 'Incoming Calling Plan',
      component: 'userIncomingCallingPlan',
      description:
        'Prevent departments, or the group from receiving incoming calls of a specified type'
    },
    {
      name: 'Outgoing Calling Plan',
      service: 'Outgoing Calling Plan',
      component: 'userOutgoingCallingPlan',
      description:
        'Prevent departments, or the group from making outgoing calls of a specified type'
    },
    {
      name: 'Outgoing Authorization Codes',
      component: 'userOutgoingCallingPlanAuthorizationCodes',
      service: 'Outgoing Calling Plan',
      description:
        'Set the authorization codes to be used on outgoing calls as defined in the Outgoing Calling Plan'
    },
    {
      name: 'Outgoing Digit Plan',
      service: 'Outgoing Calling Plan',
      component: 'userOutgoingCallingPlanDigitPlan',
      description:
        'Prevent departments, or the group from making outgoing calls based on a defined digit pattern'
    },
    {
      name: 'Outgoing Pinhole Digit Plan',
      service: 'Enhanced Outgoing Calling Plan',
      component: 'userOutgoingCallingPlanPinholeDigitPlan',
      description:
        'Override departments, or the group outgoing dial restrictions based on a defined digit pattern'
    },
    {
      name: 'Transfer Numbers',
      service: 'Outgoing Calling Plan',
      component: 'userOutgoingCallingPlanTransferNumbers',
      description:
        'Configure the transfer numbers when making an outgoing call that requires operator assistance'
    }
  ]

  function onInit() {
    ctrl.isLoading = true
    return GroupPermissionService.load(ctrl.serviceProviderId, ctrl.groupId)
      .then(function(Permission) {
        ctrl.plans.forEach(function(plan) {
          if (!plan.service) return
          plan.isActive = Permission.read(plan.service)
        })
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.isLoading = false
      })
  }

  function select(plan) {
    ctrl.selectedService = plan && plan.component
    $window.scrollTo(0, 0)
  }
}
