;(function() {
  angular.module('odin.group').component('groupCallCenterSupervisors', {
    templateUrl:
      'group/components/callCenters/callCenter/supervisors/supervisors.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '=', groupId: '=', serviceUserId: '=' }
  })

  function Controller(
    Alert,
    $q,
    GroupCallCenterSupervisorService,
    GroupCallCenterAvailableSupervisorService,
    Module
  ) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.supervisors = []
    ctrl.availableSupervisors = []
    ctrl.assignedSupervisors = []
    ctrl.addSupervisor = addSupervisor
    ctrl.removeSupervisor = removeSupervisor
    ctrl.supervisorDescription = supervisorDescription
    ctrl.canUpdate = Module.update('Call Center')
    ctrl.$onInit = activate

    function activate() {
      ctrl.loading = true
      loadSupervisors()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSupervisors() {
      return GroupCallCenterSupervisorService.show(ctrl.serviceUserId).then(
        function(data) {
          ctrl.supervisors = data.supervisors
          console.log('supervisors', ctrl.supervisors)
        }
      )
    }

    function loadAvailableSupervisors() {
      Alert.spinner.open()
      return GroupCallCenterAvailableSupervisorService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      )
        .then(function(data) {
          console.log('availableSupervisors', data)
          return data.supervisors
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
      loadAvailableSupervisors().then(function(available) {
        ctrl.assignedSupervisors = angular.copy(ctrl.supervisors)
        console.log('available', available)
        ctrl.availableSupervisors = _.filter(available, function(supervisor) {
          return !_.find(ctrl.assignedSupervisors, {
            userId: supervisor.userId
          })
        })
        console.log('availableSupervisors', ctrl.availableSupervisors)
        Alert.modal.open('editGroupCallCenterSupervisors', function(close) {
          update(ctrl.assignedSupervisors, close)
        })
      })
    }

    function update(supervisors, callback) {
      Alert.spinner.open()
      var obj = { serviceUserId: ctrl.serviceUserId, supervisors: supervisors }
      GroupCallCenterSupervisorService.update(ctrl.serviceUserId, obj)
        .then(loadSupervisors)
        .then(function() {
          Alert.notify.success('Supervisors Updated')
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

    function addSupervisor(supervisor) {
      _.remove(ctrl.availableSupervisors, { userId: supervisor.userId })
      ctrl.assignedSupervisors.push(supervisor)
    }

    function removeSupervisor(supervisor) {
      _.remove(ctrl.assignedSupervisors, { userId: supervisor.userId })
      ctrl.availableSupervisors.push(supervisor)
    }

    function supervisorDescription(supervisor) {
      if (!supervisor) return
      return (
        _.uniq([supervisor.firstName, supervisor.lastName]).join(' ') +
        ' (' +
        supervisor.userId +
        ')'
      )
    }
  }
})()
