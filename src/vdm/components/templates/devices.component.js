;(function() {
  angular.module('odin.vdm').component('vdmTemplateDevices', {
    templateUrl: 'vdm/components/templates/devices.component.html',
    controller: Controller,
    bindings: { template: '<', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(
    Alert,
    Route,
    VdmGroupTemplateDeviceService,
    GroupDeviceConfigService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.assign = assign
    ctrl.rebuild = rebuild
    ctrl.reset = reset
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      loadDevices()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevices() {
      return VdmGroupTemplateDeviceService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.template.id
      ).then(function(data) {
        console.log('devices', data)
        ctrl.devices = data
      })
    }

    function assign(device) {
      Alert.confirm
        .open('Are you sure you want to Assign this Template to this Device?')
        .then(function() {
          Alert.spinner.open()
          VdmGroupTemplateDeviceService.store(
            ctrl.serviceProviderId,
            ctrl.groupId,
            ctrl.template.id,
            device.deviceName
          )
            .then(loadDevices)
            .then(function() {
              Alert.notify.success('Template Assigned')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function rebuild(device) {
      Alert.confirm
        .open('Are you sure you want to Rebuild this device config?')
        .then(function() {
          Alert.spinner.open()
          GroupDeviceConfigService.rebuild(
            ctrl.serviceProviderId,
            ctrl.groupId,
            device
          )
            .then(function() {
              Alert.notify.success('Rebuild Command Sent')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function reset(device) {
      Alert.confirm
        .open('Are you sure you want to Reset this device?')
        .then(function() {
          Alert.spinner.open()
          GroupDeviceConfigService.reset(
            ctrl.serviceProviderId,
            ctrl.groupId,
            device
          )
            .then(function() {
              Alert.notify.success('Reset Command Sent')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function edit(device) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'vdm',
        'templates',
        ctrl.template.id,
        device.deviceName
      )().search({ name: ctrl.template.name })
    }
  }
})()
