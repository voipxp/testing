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
  '$scope'
]
function controller(
  Alert,
  UserScheduleService,
  UserEventService,
  Route,
  $scope
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add

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
      console.log('ctrl.schedules', ctrl.schedules)
    })
  }

  function add() {
    ctrl.newSchedule = { userId: ctrl.userId }
    Alert.modal.open('createScheduleModal', function(close) {
      console.log('ctrl.newSchedule', ctrl.newSchedule)
      create(ctrl.newSchedule, close)
    })
  }

  function create(schedule, callback) {
    console.log('create()', schedule)
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

  function update(schedule, callback) {
    Alert.spinner.open()
    UserScheduleService.update(schedule)
      .then(loadSchedules)
      .then(function() {
        Alert.notify.success('Schedule Addred')
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
        Alert.notify.warning('Schedule Removed')
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function open(schedule) {
    console.log('schedule', schedule)
    ctrl.schedule = schedule
    console.log('ctrl.schedule', ctrl.schedule)
    $scope.$broadcast('userScheduleEvents:load')
  }
}
