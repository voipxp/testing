import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallingPlans', {
  template,
  controller
})

controller.$inject = [
  '$routeParams',
  'Route',
  'GroupPermissionService',
  'Alert'
]
function controller($routeParams, Route, GroupPermissionService, Alert) {
  var ctrl = this
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.$onInit = onInit
  ctrl.edit = edit

  ctrl.configuration = [
    {
      name: 'Authorization Codes',
      path: 'codes',
      service: 'Outgoing Calling Plan',
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
      service: 'Enhanced Outgoing Calling Plan',
      description:
        'Configure the digit strings to be used in the Outgoing Pinhole Digit Plan'
    },
    {
      name: 'Transfer Numbers',
      path: 'transfer',
      service: 'Outgoing Calling Plan',
      description:
        'Configure the transfer numbers when making an outgoing call that requires operator assistance'
    }
  ]

  ctrl.management = [
    {
      name: 'Incoming Calling Plan',
      path: 'incoming',
      service: 'Incoming Calling Plan',
      description:
        'Prevent departments, or the group from receiving incoming calls of a specified type'
    },
    {
      name: 'Outgoing Calling Plan',
      path: 'outgoing',
      service: 'Outgoing Calling Plan',
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
      service: 'Enhanced Outgoing Calling Plan',
      description:
        'Override departments, or the group outgoing dial restrictions based on a defined digit pattern'
    }
  ]

  function onInit() {
    ctrl.isLoading = true
    return GroupPermissionService.load(ctrl.serviceProviderId, ctrl.groupId)
      .then(function(Permission) {
        ctrl.configuration.forEach(function(item) {
          item.isActive = item.service ? Permission.read(item.service) : true
        })
        ctrl.management.forEach(function(item) {
          item.isActive = item.service ? Permission.read(item.service) : true
        })
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.isLoading = false
      })
  }

  function edit(plan) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'callingPlans',
      plan.path
    )
  }
}
