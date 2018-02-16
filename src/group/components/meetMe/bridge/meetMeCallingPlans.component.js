;(function() {
  angular.module('odin.group').component('meetMeCallingPlans', {
    templateUrl:
      'group/components/meetMe/bridge/meetMeCallingPlans.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller($scope) {
    var ctrl = this

    ctrl.incoming = [
      { name: 'Incoming Calling Plan', event: 'incomingCallingPlan:load' }
    ]

    ctrl.outgoing = [
      {
        name: 'Originating Calls',
        event: 'outgoingCallingPlanOriginating:load'
      },
      {
        name: 'Initiated Forwards',
        event: 'outgoingCallingPlanRedirecting:load'
      },
      {
        name: 'Being Forwarded',
        event: 'outgoingCallingPlanRedirected:load'
      },
      {
        name: 'Call Me Now',
        event: 'outgoingCallingPlanCallMeNow:load'
      },
      {
        name: 'Authorization Code',
        event: 'outgoingCallingPlanAuthorizationCode:load'
      },
      {
        name: 'Transfer Numbers',
        event: 'outgoingCallingPlanTransferNumbers:load'
      }
    ]

    ctrl.digit = [
      {
        name: 'Originating',
        event: 'outgoingCallingPlanDigitPlanOriginating:load'
      },
      {
        name: 'Initiated Forwards',
        event: 'outgoingCallingPlanDigitPlanRedirecting:load'
      },
      {
        name: 'Call Me Now',
        event: 'outgoingCallingPlanDigitPlanCallMeNow:load'
      }
    ]

    ctrl.pinhole = [
      {
        name: 'Originating',
        event: 'outgoingCallingPlanPinholeDigitPlanOriginating:load'
      },
      {
        name: 'Initiated Forwards',
        event: 'outgoingCallingPlanPinholeDigitPlanRedirecting:load'
      },
      {
        name: 'Call Me Now',
        event: 'outgoingCallingPlanPinholeDigitPlanCallMeNow:load'
      }
    ]

    ctrl.edit = edit
    function edit(event) {
      var item = event.item
      $scope.$broadcast(item.event, ctrl.userId)
    }
  }
})()
