;(function() {
  angular.module('odin.common').component('selectUserSchedule', {
    templateUrl: 'common/components/selectSchedule/userSchedule.component.html',
    controller: Controller,
    bindings: { userId: '<', ngRequired: '<', ngModel: '=', type: '@' }
  })

  function Controller(Alert, UserScheduleService) {
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
})()
