import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupStatefulRerouting', {
  template,
  controller,
  require: { parent: '^groupTrunkGroup' }
})

controller.$inject = ['Alert', 'GroupTrunkGroupService']
function controller(Alert, GroupTrunkGroupService) {
  var ctrl = this
  ctrl.options = GroupTrunkGroupService.options
  ctrl.edit = edit

  function edit() {
    ctrl.editTrunk = angular.copy(ctrl.parent.trunk)
    Alert.modal.open('editGroupTrunkGroupCallStatefulRerouting', function onSave(close) {
      ctrl.parent.update(ctrl.editTrunk, close)
    })
  }
}
