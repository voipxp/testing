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
    VdmGroupTemplateDeviceService,
    GroupDeviceConfigService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.assign = assign
    ctrl.reset = reset
    ctrl.rebuild = rebuild

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
      Alert.confirm
        .open('Are you sure you want to Rebuild this device config?')
        .then(function() {
          Alert.spinner.open()
          GroupDeviceConfigService.rebuild(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.device
          )
            .then(function() {
              Alert.notify.success('Rebuild Command Sent')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function reset() {
      Alert.confirm
        .open('Are you sure you want to Reset this device?')
        .then(function() {
          Alert.spinner.open()
          GroupDeviceConfigService.reset(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.device
          )
            .then(function() {
              Alert.notify.success('Reset Command Sent')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }
  }
})()
