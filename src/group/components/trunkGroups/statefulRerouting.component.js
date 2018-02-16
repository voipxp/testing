;(function() {
  angular.module('odin.group').component('groupTrunkGroupStatefulRerouting', {
    templateUrl:
      'group/components/trunkGroups/statefulRerouting.component.html',
    controller: Controller,
    require: { parent: '^groupTrunkGroup' }
  })

  function Controller(Alert, GroupTrunkGroupService) {
    var ctrl = this
    ctrl.options = GroupTrunkGroupService.options
    ctrl.edit = edit

    function edit() {
      ctrl.editTrunk = angular.copy(ctrl.parent.trunk)
      Alert.modal.open(
        'editGroupTrunkGroupCallStatefulRerouting',
        function onSave(close) {
          ctrl.parent.update(ctrl.editTrunk, close)
        }
      )
    }
  }
})()
