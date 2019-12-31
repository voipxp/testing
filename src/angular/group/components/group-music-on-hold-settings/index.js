import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMusicOnHoldSettings', {
  template,
  controller,
  bindings: { moh: '<' },
  require: {
    parent: '^^groupMusicOnHold'
  }
})

controller.$inject = ['Alert', 'ACL']
function controller(Alert, ACL) {
  var ctrl = this
  ctrl.edit = edit

  function edit() {
    ctrl.editMoh = angular.copy(ctrl.moh)
    var onDelete = null
    if (ctrl.moh.department && ctrl.parent.module.permissions.delete && !ACL.is('Group Department')) {
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
