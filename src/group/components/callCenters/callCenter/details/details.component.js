;(function() {
  angular.module('odin.group').component('groupCallCenterDetails', {
    templateUrl:
      'group/components/callCenters/callCenter/details/details.component.html',
    controller: Controller,
    require: { parent: '^groupCallCenter' }
  })

  function Controller(Alert, GroupCallCenterService, Module) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.hasPermission = hasPermission
    ctrl.options = GroupCallCenterService.options
    ctrl.canUpdate = Module.update('Call Center')
    ctrl.canDelete = Module.delete('Call Center')

    function edit() {
      ctrl.editCenter = angular.copy(ctrl.parent.center)
      ctrl.editCenter.newEnterpriseTrunkName = ctrl.parent.trunkName
      var onDelete
      if (ctrl.canDelete) {
        onDelete = function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this Call Center?')
            .then(function() {
              ctrl.parent.destroy(close)
            })
        }
      }
      Alert.modal.open(
        'editGroupCallCenterDetails',
        function onSave(close) {
          ctrl.parent.update(ctrl.editCenter, close)
        },
        onDelete
      )
    }

    function hasPermission(attribute) {
      return GroupCallCenterService.hasPermission(ctrl.parent.center, attribute)
    }
  }
})()
