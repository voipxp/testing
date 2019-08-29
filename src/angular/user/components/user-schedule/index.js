import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userSchedule', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserScheduleService', 'Route', '$location']
function controller(Alert, UserScheduleService, Route, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.back = back
  ctrl.edit = edit

  function onInit() {
    ctrl.type = $location.search().type
    ctrl.name = $location.search().name
    ctrl.loading = true
    loadSchedule()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSchedule() {
    return UserScheduleService.show(ctrl.userId, ctrl.name, ctrl.type).then(
      function(data) {
        ctrl.schedule = data
      }
    )
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
        Alert.confirm
          .open('Are you sure you want to remove this Schedule?')
          .then(function() {
            destroy(close)
          })
      }
    )
  }

  function update(schedule, callback) {
    Alert.spinner.open()
    UserScheduleService.update(schedule)
      .then(function() {
        Alert.notify.success('Schedule Updated')
        callback()
        schedule.newName === ctrl.name ? loadSchedule() : open(schedule)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(callback) {
    Alert.spinner.open()
    UserScheduleService.destroy(ctrl.schedule)
      .then(function() {
        Alert.notify.warning('Schedule Removed')
        callback()
        back()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function back() {
    Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'schedules')
  }

  function open(schedule) {
    return Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'schedules',
      'schedule'
    ).search({
      name: schedule.newName,
      type: schedule.type
    })
  }
}
