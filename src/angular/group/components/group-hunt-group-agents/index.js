import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroupAgents', {
  template,
  controller,
  require: { parent: '^groupHuntGroup' }
})

controller.$inject = ['GroupHuntGroupUserService', 'Alert']
function controller(GroupHuntGroupUserService, Alert) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.editAgentWeight = editAgentWeight

  function edit() {
    if (!ctrl.parent.module.permissions.update) return
    Alert.spinner.open()
    loadAvailableAgents()
      .then(function(available) {
        ctrl.assignedAgents = angular.copy(ctrl.parent.huntGroup.agents)
        ctrl.availableAgents = _.filter(available, function(user) {
          return !_.find(ctrl.assignedAgents, { userId: user.userId })
        })
        Alert.modal.open('groupHuntGroupAgentsModal', function(close) {
          var huntGroup = angular.copy(ctrl.parent.huntGroup)
          huntGroup.agents = ctrl.assignedAgents
          return ctrl.parent.update(huntGroup, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function editAgentWeight() {
    if (!ctrl.parent.module.permissions.update) return
    Alert.spinner.open()
    loadAvailableAgents()
      .then(function(available) {
        ctrl.assignedAgents = angular.copy(ctrl.parent.huntGroup.agents)
        ctrl.availableAgents = _.filter(available, function(user) {
          return !_.find(ctrl.assignedAgents, { userId: user.userId })
        })
        Alert.modal.open('groupHuntGroupAgentsWeightedModal', function(close) {
          var huntGroup = angular.copy(ctrl.parent.huntGroup)
          huntGroup.agents = ctrl.assignedAgents
          return ctrl.parent.updateWeight(huntGroup, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function loadAvailableAgents() {
    return GroupHuntGroupUserService.index(
      ctrl.parent.serviceUserId,
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId
    )
  }
}
