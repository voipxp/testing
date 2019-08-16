import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterAgents', {
  template,
  controller,
  bindings: {
    serviceProviderId: '=',
    groupId: '=',
    serviceUserId: '=',
    callCenterType: '='
  }
})

controller.$inject = [
  'Alert',
  '$q',
  'GroupCallCenterAgentService',
  'GroupCallCenterAvailableAgentService',
  '$filter',
  'Module'
]
function controller(
  Alert,
  $q,
  GroupCallCenterAgentService,
  GroupCallCenterAvailableAgentService,
  $filter,
  Module
) {
  var ctrl = this

  ctrl.edit = edit
  ctrl.agents = []
  ctrl.availableAgents = []
  ctrl.assignedAgents = []
  ctrl.isSkillBased = isSkillBased
  ctrl.canUpdate = Module.update('Call Center')
  ctrl.$onInit = activate

  function activate() {
    ctrl.loading = true
    loadAgents()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAgents() {
    return GroupCallCenterAgentService.show(ctrl.serviceUserId).then(function(data) {
      ctrl.agents = isSkillBased ? $filter('orderBy')(data.agents, 'skillLevel') : data.agents
    })
  }

  function loadAvailableAgents() {
    Alert.spinner.open()
    return GroupCallCenterAvailableAgentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.callCenterType
    )
      .then(function(data) {
        return data.agents
      })
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function edit() {
    if (!ctrl.canUpdate) return
    loadAvailableAgents().then(function(available) {
      ctrl.assignedAgents = angular.copy(ctrl.agents)
      ctrl.availableAgents = _.filter(available, function(agent) {
        return !_.find(ctrl.assignedAgents, { userId: agent.userId })
      })
      Alert.modal.open('editGroupCallCenterAgents', function onSave(close) {
        update(ctrl.assignedAgents, close)
      })
    })
  }

  function update(agents, callback) {
    Alert.spinner.open()
    var object = { serviceUserId: ctrl.serviceUserId, agents: agents }
    GroupCallCenterAgentService.update(ctrl.serviceUserId, object)
      .then(loadAgents)
      .then(function() {
        Alert.notify.success('Agents Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function isSkillBased() {
    var firstAgent = ctrl.agents[0]
    return firstAgent && firstAgent.skillLevel
  }
}
