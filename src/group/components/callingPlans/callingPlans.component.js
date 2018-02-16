;(function() {
  angular.module('odin.group').component('groupCallingPlans', {
    templateUrl: 'group/components/callingPlans/callingPlans.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.edit = edit

    ctrl.configuration = [
      {
        name: 'Authorization Codes',
        path: 'codes',
        description:
          'Set the authorization codes to be used on outgoing calls as defined in the Outgoing Calling Plan'
      },
      {
        name: 'Digit Patterns',
        path: 'digitPatterns',
        description:
          'Configure the digit strings to be used in the Incoming Calling Plan and Outgoing Digit Plan'
      },
      {
        name: 'Pinhole Digit Patterns',
        path: 'pinholeDigitPatterns',
        description:
          'Configure the digit strings to be used in the Outgoing Pinhole Digit Plan'
      },
      {
        name: 'Transfer Numbers',
        path: 'transfer',
        description:
          'Configure the transfer numbers when making an outgoing call that requires operator assistance'
      }
    ]

    ctrl.management = [
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
      }
    ]

    function edit(plan) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'callingPlans',
        plan.path
      )
    }
  }
})()
