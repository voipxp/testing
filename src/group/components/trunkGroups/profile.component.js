;(function() {
  angular.module('odin.group').component('groupTrunkGroupProfile', {
    templateUrl: 'group/components/trunkGroups/profile.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroup' }
  })

  function Controller(Alert, GroupTrunkGroupService, GroupDepartmentService) {
    var ctrl = this
    ctrl.options = GroupTrunkGroupService.options
    ctrl.edit = edit

    function edit() {
      var onDelete
      if (ctrl.parent.module.permissions.delete) {
        onDelete = ctrl.parent.destroy
      }
      Alert.spinner.open()
      loadDepartments()
        .then(function() {
          ctrl.editTrunk = angular.copy(ctrl.parent.trunk)
          ctrl.editTrunk.newName = ctrl.parent.trunkName
          Alert.modal.open(
            'editGroupTrunkGroupProfile',
            function onSave(close) {
              update(ctrl.editTrunk, close)
            },
            onDelete
          )
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function update(trunk, callback) {
      if (
        trunk.requireAuthentication &&
        trunk.sipAuthenticationPassword !== trunk.sipAuthenticationPassword2
      ) {
        Alert.notify.success('Passwords Do Not Match')
        return
      }
      ctrl.parent.update(ctrl.editTrunk, callback)
    }

    function loadDepartments() {
      return GroupDepartmentService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.departments = data
        return data
      })
    }
  }
})()
