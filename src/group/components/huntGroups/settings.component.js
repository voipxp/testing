;(function() {
  angular.module('odin.group').component('groupHuntGroupSettings', {
    templateUrl: 'group/components/huntGroups/settings.component.html',
    controller: Controller,
    require: { parent: '^groupHuntGroup' }
  })

  function Controller(GroupHuntGroupService, Alert, ACL) {
    var ctrl = this
    ctrl.hasVersion20 = ACL.hasVersion('20')
    ctrl.edit = edit

    function edit() {
      ctrl.editHuntGroup = angular.copy(ctrl.parent.huntGroup)
      var deleteAction
      if (ctrl.parent.module.permissions.delete) {
        deleteAction = function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this Hunt Group?')
            .then(function() {
              ctrl.parent.destroy(close)
            })
        }
      }
      Alert.modal.open(
        'groupHuntGroupEditSettingsModal',
        function(close) {
          ctrl.parent.update(ctrl.editHuntGroup, close)
        },
        deleteAction
      )
    }
  }
})()
