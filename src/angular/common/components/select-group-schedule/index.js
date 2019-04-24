import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectGroupSchedule', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    ngRequired: '<',
    ngModel: '=',
    type: '@'
  }
})

controller.$inject = ['Alert', 'GroupScheduleService']
function controller(Alert, GroupScheduleService) {
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
    return GroupScheduleService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.schedules = data
    })
  }
}
