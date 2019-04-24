import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupSchedules', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupScheduleService', 'Route']
function controller(Alert, GroupScheduleService, Route) {
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
    return GroupScheduleService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.schedules = data
    })
  }

  function add() {
    ctrl.newSchedule = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    Alert.modal.open('createScheduleModal', function(close) {
      create(ctrl.newSchedule, close)
    })
  }

  function create(schedule, callback) {
    Alert.spinner.open()
    GroupScheduleService.store(schedule)
      .then(function() {
        Alert.notify.success('Schedule Created')
        callback()
        open(schedule)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function open(schedule) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'schedules',
      'schedule'
    ).search({
      name: schedule.name,
      type: schedule.type
    })
  }
}
