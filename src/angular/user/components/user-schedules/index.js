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
  'Route'
]
function controller(Alert, UserScheduleService, UserEventService, Route) {
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
    Alert.spinner.open()
    console.log('schedule', schedule)
    UserScheduleService.store(schedule)
      .then(function() {
        Alert.notify.success('Schedule Created')
        callback()
        loadSchedules()
        // open(schedule)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function open(schedule) {
    ctrl.showEvents = true
    console.log('show events for schedule', schedule)
    // Route.open(
    //   'groups',
    //   ctrl.serviceProviderId,
    //   ctrl.groupId,
    //   'schedules',
    //   'schedule'
    // ).search({
    //   name: schedule.name,
    //   type: schedule.type
    // })
  }
}
