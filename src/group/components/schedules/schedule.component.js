;(function() {
  angular.module('odin.group').component('groupSchedule', {
    templateUrl: 'group/components/schedules/schedule.component.html',
    controller: Controller
  })

  function Controller($routeParams, Alert, GroupScheduleService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.scheduleType = $routeParams.scheduleType
    ctrl.scheduleName = $routeParams.scheduleName
    ctrl.back = back
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      loadSchedule()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSchedule() {
      return GroupScheduleService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType
      ).then(function(data) {
        ctrl.schedule = data
      })
    }

    function edit() {
      ctrl.editSchedule = angular.copy(ctrl.schedule)
      ctrl.editSchedule.newName = ctrl.schedule.name
      Alert.modal.open(
        'editGroupScheduleModal',
        function(close) {
          if (ctrl.editSchedule.newName === ctrl.schedule.name) {
            return close()
          }
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
      GroupScheduleService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType,
        schedule
      )
        .then(function() {
          Alert.notify.success('Schedule Updated')
          callback()
          open(schedule)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(callback) {
      Alert.spinner.open()
      GroupScheduleService.destroy(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.scheduleName,
        ctrl.scheduleType
      )
        .then(function() {
          Alert.notify.warning('Schedule Removed')
          callback()
          back()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function back() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'schedules')()
    }

    function open(schedule) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'schedules')(
        schedule.newName,
        schedule.type
      )
    }
  }
})()
