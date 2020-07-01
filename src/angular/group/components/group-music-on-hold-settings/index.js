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

controller.$inject = ['Alert', 'ACL', 'Module']
function controller(Alert, ACL, Module) {
  var ctrl = this
  ctrl.edit = edit
  loadModule()

  function loadModule() {
    return Module.show('Music On Hold').then(function(data) {
      ctrl.parent.module = data
    })
}
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
