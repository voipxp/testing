;(function() {
  angular.module('odin.group').component('groupCallCenterAgents', {
    templateUrl:
      'group/components/callCenters/callCenter/agents/agents.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '=',
      groupId: '=',
      serviceUserId: '=',
      callCenterType: '='
    }
  })

  function Controller(
    Alert,
    $q,
    GroupCallCenterAgentService,
    GroupCallCenterAvailableAgentService,
    $scope,
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
      return GroupCallCenterAgentService.show(ctrl.serviceUserId).then(function(
        data
      ) {
        console.log('incoming', data.agents)
        ctrl.agents = isSkillBased
          ? $filter('orderBy')(data.agents, 'skillLevel')
          : data.agents
        console.log('sorted', ctrl.agents)
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
        console.log('available', available)
        ctrl.availableAgents = _.filter(available, function(agent) {
          return !_.find(ctrl.assignedAgents, { userId: agent.userId })
        })
        console.log('availableAgents', ctrl.availableAgents)
        Alert.modal.open('editGroupCallCenterAgents', function onSave(close) {
          update(ctrl.assignedAgents, close)
        })
      })
    }

    function update(agents, callback) {
      Alert.spinner.open()
      var obj = { serviceUserId: ctrl.serviceUserId, agents: agents }
      GroupCallCenterAgentService.update(ctrl.serviceUserId, obj)
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
})()
