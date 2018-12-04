;(function() {
  angular.module('odin.group').component('groupTrunkGroupProfile', {
    templateUrl: 'group/components/trunkGroups/profile.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroup' }
  })

  function Controller(
    Alert,
    GroupTrunkGroupService,
    Module,
    GroupPolicyService
  ) {
    var ctrl = this
    ctrl.options = GroupTrunkGroupService.options
    ctrl.edit = edit
    ctrl.$onInit = onInit
    ctrl.canUpdate = Module.update('Trunk Group - Authentication')

    function onInit() {
      return Module.show('Trunk Group - Authentication').then(function(data) {
        ctrl.authentication = data.permissions
        GroupPolicyService.load().then(function() {
          ctrl.canUpdate =
            GroupPolicyService.trunkGroupUpdate() && ctrl.canUpdate
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
})()
