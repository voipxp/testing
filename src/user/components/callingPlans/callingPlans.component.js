;(function() {
  angular.module('odin.user').component('userCallingPlans', {
    templateUrl: 'user/components/callingPlans/callingPlans.component.html',
    controller: Controller,
    bindings: {
      userId: '<',
      groupId: '<',
      serviceProviderId: '<'
    }
  })

  function Controller($window, GroupPermissionService, Alert) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.select = select

    ctrl.plans = [
      {
        name: 'Incoming Calling Plan',
        service: 'Incoming Calling Plan',
        description:
          'Prevent departments, or the group from receiving incoming calls of a specified type'
      },
      {
        name: 'Outgoing Calling Plan',
        service: 'Outgoing Calling Plan',
        description:
          'Prevent departments, or the group from making outgoing calls of a specified type'
      },
      {
        name: 'Outgoing Authorization Codes',
        service: 'Outgoing Calling Plan',
        description:
          'Set the authorization codes to be used on outgoing calls as defined in the Outgoing Calling Plan'
      },
      {
        name: 'Outgoing Digit Plan',
        service: 'Outgoing Calling Plan',
        description:
          'Prevent departments, or the group from making outgoing calls based on a defined digit pattern'
      },
      {
        name: 'Outgoing Pinhole Digit Plan',
        service: 'Enhanced Outgoing Calling Plan',
        description:
          'Override departments, or the group outgoing dial restrictions based on a defined digit pattern'
      },
      {
        name: 'Transfer Numbers',
        service: 'Outgoing Calling Plan',
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
      ctrl.selectedService = plan && plan.name
      $window.scrollTo(0, 0)
    }
  }
})()
