;(function() {
  angular.module('odin.vdm').component('vdmDeviceDetails', {
    templateUrl: 'vdm/components/device/details.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      deviceName: '<',
      template: '<'
    }
  })

  function Controller(
    Alert,
    GroupDeviceService,
    VdmGroupTemplateDeviceService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.assign = assign
    ctrl.rebuildReset = rebuildReset

    function onInit() {
      ctrl.loading = true
      loadDevice()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevice() {
      return GroupDeviceService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.deviceName
      ).then(function(data) {
        ctrl.device = data
      })
    }

    function assign() {
      Alert.confirm
        .open('Are you sure you want to Assign this Template to this Device?')
        .then(function() {
          Alert.spinner.open()
          VdmGroupTemplateDeviceService.store(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.template.id,
            ctrl.deviceName
          )
            .then(function() {
              Alert.notify.success('Template Assigned')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function rebuild() {
      return GroupDeviceService.rebuild(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.device
      )
    }

    function reset() {
      return GroupDeviceService.reset(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.device
      )
    }

    function rebuildReset() {
      Alert.confirm
        .open('Are you sure you want to rebuild and reset this device?')
        .then(function() {
          Alert.spinner.open()
        })
        .then(rebuild)
        .then(reset)
        .then(function() {
          Alert.notify.success('Rebuild and Reset command sent to device')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
