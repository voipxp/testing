;(function() {
  angular.module('odin.common').component('selectUserSchedule', {
    templateUrl:
      'common/components/selectUserSchedule/userSchedule.component.html',
    controller: Controller,
    bindings: { userId: '<', ngRequired: '<', ngModel: '=', type: '@' }
  })

  function Controller(Alert, UserScheduleService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      loadUserSchedules()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUserSchedules() {
      return UserScheduleService.index(ctrl.userId).then(function(data) {
        ctrl.schedules = data
      })
    }
  }
})()
