import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupProfile', {
  template,
  controller,
  require: { parent: '^groupTrunkGroup' }
})

controller.$inject = [
  'Alert',
  'GroupTrunkGroupService',
  'Module',
  'GroupPolicyService',
  'ACL'
]
function controller(Alert, GroupTrunkGroupService, Module, GroupPolicyService, ACL) {
  var ctrl = this
  ctrl.options = GroupTrunkGroupService.options
  ctrl.edit = edit
  ctrl.$onInit = onInit
  ctrl.canUpdate = Module.update('Trunk Group - Authentication')
  ctrl.isDepartmentAdmin = ACL.is('Group Department')

  function onInit() {
    return Module.show('Trunk Group - Authentication').then(function(data) {
      ctrl.authentication = data.permissions
      GroupPolicyService.load().then(function() {
        ctrl.canUpdate = GroupPolicyService.trunkGroupUpdate() && ctrl.canUpdate
      })
    })
  }
  function edit() {
    var onDelete
    if (ctrl.parent.module.permissions.delete) {
      onDelete = ctrl.parent.destroy
    }
    ctrl.editTrunk = angular.copy(ctrl.parent.trunk)
    ctrl.editTrunk.newName = ctrl.parent.trunkName
    Alert.modal.open(
      'editGroupTrunkGroupProfile',
      function onSave(close) {
        update(ctrl.editTrunk, close)
      },
      onDelete
    )
  }

  function update(trunk, callback) {
    ctrl.parent.update(trunk, callback)
  }
}
