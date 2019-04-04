import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupEnterpriseTrunkTrunkGroups', {
  template,
  controller,
  require: { parent: '^groupEnterpriseTrunk' }
})

controller.$inject = [
  'Alert',
  'GroupEnterpriseTrunkAvailableTrunkGroupService',
  '$scope'
]
function controller(
  Alert,
  GroupEnterpriseTrunkAvailableTrunkGroupService,
  $scope
) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.addTrunk = addTrunk
  ctrl.removeTrunk = removeTrunk
  ctrl.editTrunk = editTrunk

  function isPriorityWeightedRouting() {
    return ctrl.parent.trunk.priorityWeightedRouting
  }

  function loadAvailableTrunks() {
    return GroupEnterpriseTrunkAvailableTrunkGroupService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId,
      ctrl.parent.trunkName
    ).then(function(data) {
      ctrl.assignedTrunks = angular.copy(ctrl.parent.trunk.trunkGroups)
      ctrl.availableTrunks = _.filter(data.trunkGroups, function(trunk) {
        return !_.find(ctrl.assignedTrunks, {
          trunkGroupName: trunk.trunkGroupName
        })
      })
      return data
    })
  }

  function edit() {
    Alert.spinner.open()
    loadAvailableTrunks()
      .then(function() {
        Alert.modal.open('editGroupEnterpriseTrunkTrunkGroups', function onSave(
          close
        ) {
          var editTrunk = angular.copy(ctrl.parent.trunk)
          editTrunk.trunkGroups = ctrl.assignedTrunks
          ctrl.parent.update(editTrunk, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function editTrunk(trunk) {
    if (!isPriorityWeightedRouting()) return
    ctrl.selectedTrunk = trunk
    if ($scope.editGroupEnterpriseTrunkTrunkGroupForm) {
      $scope.editGroupEnterpriseTrunkTrunkGroupForm.$setPristine()
    }
    Alert.modal.open('editGroupEnterpriseTrunkTrunkGroup', function(close) {
      ctrl.parent.update(ctrl.parent.trunk, close)
    })
  }

  function addWeightAndPriority(trunk) {
    if (!isPriorityWeightedRouting()) return
    trunk.priority = trunk.priority || '10'
    trunk.weight = trunk.weight || '50'
  }

  function addTrunk(trunk) {
    addWeightAndPriority(trunk)
    _.remove(ctrl.availableTrunks, { trunkGroupName: trunk.trunkGroupName })
    ctrl.assignedTrunks.push(trunk)
  }

  function removeTrunk(trunk) {
    _.remove(ctrl.assignedTrunks, { trunkGroupName: trunk.trunkGroupName })
    ctrl.availableTrunks.push(trunk)
  }
}
