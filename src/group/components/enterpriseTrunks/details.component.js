;(function() {
  angular.module('odin.group').component('groupEnterpriseTrunkDetails', {
    templateUrl: 'group/components/enterpriseTrunks/details.component.html',
    controller: Controller,
    require: { parent: '^groupEnterpriseTrunk' }
  })

  function Controller(Alert, GroupEnterpriseTrunkService) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.edit = edit
    ctrl.updateConfirm = updateConfirm
    ctrl.options = GroupEnterpriseTrunkService.options
    ctrl.isDisabled = { enterpriseTrunkName: true }

    var _confirmMessages = {
      routeExhaustionAction: {
        Forward:
          'Warning: You are about to forward excess calls for this trunk to another phone number whenever this trunk has reached capacity. Please ensure the phone number is valid and can be dialled successfully from this trunk. Forwarding calls to a number that is not reachable from the trunk will result in callers being presented a disconnection message. Please note additional call charges may apply for forwarded calls.'
      }
    }

    function activate() {}

    function edit() {
      ctrl.editTrunk = angular.copy(ctrl.parent.trunk)
      ctrl.editTrunk.newEnterpriseTrunkName = ctrl.parent.trunkName
      Alert.modal.open('editGroupEnterpriseTrunkDetails', function(close) {
        ctrl.parent.update(ctrl.editTrunk, close)
      })
    }

    function updateConfirm(propertyName) {
      var selectedOption = ctrl.editTrunk[propertyName]
      var message = _.get(_confirmMessages, [propertyName, selectedOption])
      if (!message) return
      Alert.confirm.open(message, function onCancel() {
        ctrl.editTrunk[propertyName] = ctrl.parent.trunk[propertyName]
      })
    }
  }
})()
