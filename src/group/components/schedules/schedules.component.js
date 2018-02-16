;(function() {
  angular.module('odin.group').component('groupSchedules', {
    templateUrl: 'group/components/schedules/schedules.component.html',
    controller: Controller
  })

  function Controller($routeParams, Alert, GroupScheduleService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
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
        console.log('schedules', data)
        return data
      })
    }

    function add() {
      ctrl.newSchedule = { type: 'Group' }
      Alert.modal.open('createScheduleModal', function(close) {
        create(ctrl.newSchedule, close)
      })
    }

    function create(schedule, callback) {
      Alert.spinner.open()
      GroupScheduleService.store(ctrl.serviceProviderId, ctrl.groupId, schedule)
        .then(function() {
          Alert.notify.success('Schedule Created')
          callback()
          open(schedule)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function open(schedule) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'schedules')(
        schedule.name,
        schedule.type
      )
    }
  }
})()
