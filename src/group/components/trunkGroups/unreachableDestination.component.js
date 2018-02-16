;(function() {
  angular
    .module('odin.group')
    .component('groupTrunkGroupUnreachableDestination', {
      templateUrl:
        'group/components/trunkGroups/unreachableDestination.component.html',
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
        'editGroupTrunkGroupCallUnreachableDestination',
        function onSave(close) {
          ctrl.parent.update(ctrl.editTrunk, close)
        }
      )
    }
  }
})()
