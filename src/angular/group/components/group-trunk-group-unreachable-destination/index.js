import angular from 'angular'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupTrunkGroupUnreachableDestination', {
    template,
    controller,
    require: { parent: '^groupTrunkGroup' }
  })

controller.$inject = ['Alert', 'GroupTrunkGroupService', 'ACL']
function controller(Alert, GroupTrunkGroupService, ACL) {
  var ctrl = this
  ctrl.options = GroupTrunkGroupService.options
  ctrl.edit = edit
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadAvailableTrunks()
      .catch(Alert.error)
      .finally(() => (ctrl.loading = false))
  }

  function loadAvailableTrunks() {
    return GroupTrunkGroupService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId,
      {
        includeEnterpriseTrunkGroups: true,
        onlyTrunkGroupsWithDevice: true
      }
    ).then(data => {
      if(ACL.is('Group Department')) data = ACL.filterByDepartment(data)
      ctrl.availableTrunks = removeSelectedTrunk(data)
    })
  }

  function removeSelectedTrunk(trunks) {
    return trunks.filter(function(trunk) {
			return trunk.name !== ctrl.parent.trunk.name
	  })
  }

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
