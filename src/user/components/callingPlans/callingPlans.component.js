;(function() {
  angular.module('odin.user').component('userCallingPlans', {
    templateUrl: 'user/components/callingPlans/callingPlans.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.open = open

    ctrl.plans = [
      {
        name: 'Incoming Calling Plan',
        path: 'incoming',
        description:
          'Prevent departments, or the group from receiving incoming calls of a specified type'
      },
      {
        name: 'Outgoing Calling Plan',
        path: 'outgoing',
        description:
          'Prevent departments, or the group from making outgoing calls of a specified type'
      },
      {
        name: 'Outgoing Authorization Codes',
        path: 'codes',
        description:
          'Set the authorization codes to be used on outgoing calls as defined in the Outgoing Calling Plan'
      },
      {
        name: 'Outgoing Digit Plan',
        path: 'digitPlan',
        description:
          'Prevent departments, or the group from making outgoing calls based on a defined digit pattern'
      },
      {
        name: 'Outgoing Pinhole Digit Plan',
        path: 'pinholeDigitPlan',
        description:
          'Override departments, or the group outgoing dial restrictions based on a defined digit pattern'
      },
      {
        name: 'Transfer Numbers',
        path: 'transfer',
        description:
          'Configure the transfer numbers when making an outgoing call that requires operator assistance'
      }
    ]

    function open(plan) {
      Route.open('users', ctrl.serviceProviderId, ctrl.groupId, ctrl.userId)(
        'callingPlans',
        plan.path
      )
    }
  }
})()
