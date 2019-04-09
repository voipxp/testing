import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectUserSchedule', {
  template,
  controller,
  bindings: { userId: '<', ngRequired: '<', ngModel: '=', type: '@' }
})

controller.$inject = ['Alert', 'UserScheduleService']
function controller(Alert, UserScheduleService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadSchedules()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSchedules() {
    return UserScheduleService.index(ctrl.userId).then(function(data) {
      ctrl.schedules = data
    })
  }
}
