;(function() {
  angular.module('odin.group').component('groupCallCenterHolidayService', {
    templateUrl:
      'group/components/callCenters/callCenter/routing/holidayService.component.html',
    controller: Controller,
    bindings: { serviceUserId: '<' }
  })

  function Controller(
    GroupCallCenterHolidayServiceService,
    UserScheduleService,
    Alert,
    $q,
    Module
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.options = GroupCallCenterHolidayServiceService.options
    ctrl.canUpdate = Module.update('Call Center')

    function onInit() {
      ctrl.loading = true
      loadService()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.serviceUserId) {
        ctrl.serviceUserId = changes.serviceUserId.currentValue
      }
    }

    function loadService() {
      return GroupCallCenterHolidayServiceService.show(ctrl.serviceUserId).then(
        function(data) {
          ctrl.service = data
        }
      )
    }

    function loadSchedules() {
      if (!ctrl.schedules || ctrl.schedules.length < 1) {
        return UserScheduleService.index(ctrl.serviceUserId).then(function(
          data
        ) {
          ctrl.schedules = data
          return data
        })
      } else {
        return $q.when(ctrl.schedules)
      }
    }

    function edit() {
      Alert.spinner.open()
      loadSchedules()
        .then(function() {
          ctrl.editService = angular.copy(ctrl.service)
          Alert.modal.open('editGroupCallCenterHolidayService', function(
            close
          ) {
            update(ctrl.editService, close)
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function update(service, callback) {
      Alert.spinner.open()
      GroupCallCenterHolidayServiceService.update(ctrl.serviceUserId, service)
        .then(loadService)
        .then(function() {
          Alert.notify.success('Holiday Service Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
