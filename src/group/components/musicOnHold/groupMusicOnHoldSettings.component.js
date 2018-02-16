;(function() {
  angular.module('odin.group').component('groupMusicOnHoldSettings', {
    templateUrl:
      'group/components/musicOnHold/groupMusicOnHoldSettings.component.html',
    controller: Controller,
    bindings: {
      moh: '<'
    },
    require: {
      parent: '^^groupMusicOnHold'
    }
  })

  function Controller(Alert) {
    var ctrl = this
    ctrl.edit = edit

    function edit() {
      ctrl.editMoh = angular.copy(ctrl.moh)
      var onDelete = null
      if (ctrl.moh.department && ctrl.parent.module.permissions.delete) {
        onDelete = function onDelete(close) {
          ctrl.parent.destroy(close)
        }
      }
      Alert.modal.open(
        'groupMusicOnHoldSettingsModal',
        function onSave(close) {
          ctrl.parent.update(ctrl.editMoh, close)
        },
        onDelete
      )
    }
  }
})()
