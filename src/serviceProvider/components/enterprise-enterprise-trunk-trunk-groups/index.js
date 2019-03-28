import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.serviceProvider')
  .component('enterpriseEnterpriseTrunkTrunkGroups', {
    template,
    controller,
    require: { parent: '^enterpriseEnterpriseTrunk' }
  })

controller.$inject = [
  'Alert',
  'EnterpriseEnterpriseTrunkAvailableTrunkGroupService',
  '$scope'
]
function controller(
  Alert,
  EnterpriseEnterpriseTrunkAvailableTrunkGroupService,
  $scope
) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.edit = edit
  ctrl.addTrunk = addTrunk
  ctrl.removeTrunk = removeTrunk
  ctrl.editTrunk = editTrunk

  function activate() {}

  function isPriorityWeightedRouting() {
    return ctrl.parent.trunk.priorityWeightedRouting
  }

  function loadAvailableTrunks() {
    return EnterpriseEnterpriseTrunkAvailableTrunkGroupService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.trunkName
    ).then(function(data) {
      ctrl.assignedTrunks = angular.copy(ctrl.parent.trunk.trunkGroups)
      ctrl.availableTrunks = _.filter(data.trunkGroups, function(trunk) {
        return !_.find(ctrl.assignedTrunks, {
          trunkGroupName: trunk.trunkGroupName,
          groupId: trunk.groupId
        })
      })
      return data
    })
  }

  function edit() {
    if (!ctrl.parent.module.permissions.update) return
    Alert.spinner.open()
    loadAvailableTrunks()
      .then(function() {
        Alert.modal.open(
          'editEnterpriseEnterpriseTrunkTrunkGroups',
          function onSave(close) {
            var editTrunk = angular.copy(ctrl.parent.trunk)
            editTrunk.trunkGroups = ctrl.assignedTrunks
            ctrl.parent.update(editTrunk, close)
          }
        )
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function editTrunk(trunk) {
    if (!isPriorityWeightedRouting()) return
    ctrl.selectedTrunk = trunk
    if ($scope.editEnterpriseEnterpriseTrunkTrunkGroupForm) {
      $scope.editEnterpriseEnterpriseTrunkTrunkGroupForm.$setPristine()
    }
    Alert.modal.open('editEnterpriseEnterpriseTrunkTrunkGroup', function onSave(
      close
    ) {
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
    _.remove(ctrl.availableTrunks, {
      trunkGroupName: trunk.trunkGroupName,
      groupId: trunk.groupId
    })
    ctrl.assignedTrunks.push(trunk)
  }

  function removeTrunk(trunk) {
    _.remove(ctrl.assignedTrunks, {
      trunkGroupName: trunk.trunkGroupName,
      groupId: trunk.groupId
    })
    ctrl.availableTrunks.push(trunk)
  }
}
