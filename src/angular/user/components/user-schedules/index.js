import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userSchedules', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserScheduleService',
  'UserEventService',
  'Route',
  '$scope',
  '$timeout'
]
function controller(Alert, UserScheduleService, UserEventService, Route, $scope, $timeout) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.edit = edit

  function onInit() {
    ctrl.loading = true
    loadSchedules()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSchedules() {
    return UserScheduleService.index(ctrl.userId).then(function(data) {
      ctrl.schedules = data
    })
  }

  function add() {
    ctrl.newSchedule = { userId: ctrl.userId }
    Alert.modal.open('createScheduleModal', function(close) {
      create(ctrl.newSchedule, close)
    })
  }

  function create(schedule, callback) {
    Alert.spinner.open()
    UserScheduleService.store(schedule)
      .then(loadSchedules)
      .then(function() {
        Alert.notify.success('Schedule Created')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function edit() {
    ctrl.editSchedule = angular.copy(ctrl.schedule)
    ctrl.editSchedule.newName = ctrl.schedule.name
    Alert.modal.open(
      'editUserScheduleModal',
      function(close) {
        update(ctrl.editSchedule, close)
      },
      function(close) {
        Alert.confirm.open('Are you sure you want to remove this Schedule?').then(function() {
          destroy(close)
        })
      }
    )
  }

  function update(schedule, callback) {
    Alert.spinner.open()
    UserScheduleService.update(schedule)
      .then(loadSchedules)
      .then(function() {
        Alert.notify.success('Schedule Added')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.spinner.open()
    UserScheduleService.destroy(ctrl.schedule)
      .then(loadSchedules)
      .then(function() {
        ctrl.schedule.level = 'Group'
        Alert.notify.warning('Schedule Removed')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function open(schedule) {
    ctrl.schedule = {}
    if (schedule.level !== 'User') return
    $timeout(() => (ctrl.schedule = schedule), 0)
  }
}
