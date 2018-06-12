;(function() {
  angular.module('odin.common').component('selectGroupSchedule', {
    templateUrl:
      'common/components/selectSchedule/groupSchedule.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      ngRequired: '<',
      ngModel: '=',
      type: '@'
    }
  })

  function Controller(Alert, GroupScheduleService) {
    var ctrl = this
    ctrl.$onInit = onInit
    console.log(ctrl)

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
})()
