;(function() {
  angular.module('odin.group').component('autoAttendantSettings', {
    templateUrl:
      'group/components/autoAttendants/autoAttendant/settings.component.html',
    controller: Controller,
    require: { parent: '^^autoAttendant' },
    bindings: {
      autoAttendant: '<',
      loading: '<'
    }
  })

  function Controller(
    Alert,
    GroupAutoAttendantService,
    Module,
    GroupScheduleService,
    ACL
  ) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.options = GroupAutoAttendantService.options
    ctrl.hasAnnouncements = ACL.hasVersion('20')
    ctrl.canUpdate = Module.update('Auto Attendant')
    ctrl.canDelete = Module.delete('Auto Attendant')

    function edit() {
      var onDelete = null
      if (ctrl.canDelete) {
        onDelete = function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this Auto Attendant?')
            .then(function onConfirm() {
              ctrl.parent.destroy(close)
            })
        }
      }
      ctrl.editAutoAttendant = angular.copy(ctrl.autoAttendant)
      Alert.spinner.open()
      loadSchedules()
        .then(function() {
          Alert.modal.open(
            'autoAttendantDetails',
            function(close) {
              ctrl.parent.update(ctrl.editAutoAttendant, close)
            },
            onDelete
          )
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadSchedules() {
      return GroupScheduleService.index(
        ctrl.autoAttendant.serviceProviderId,
        ctrl.autoAttendant.groupId
      ).then(function(data) {
        ctrl.schedules = data
        console.log('schedules', data)
        return data
      })
    }
  }
})()