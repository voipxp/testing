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
    GroupDeviceService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.assign = assign
    ctrl.rebuildReset = rebuildReset
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
      return GroupDeviceService.rebuild(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device.deviceName
      )
    }

    function reset(device) {
      return GroupDeviceService.reset(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device.deviceName
      )
    }

    function rebuildReset(device) {
      Alert.confirm
        .open('Are you sure you want to rebuild and reset this device?')
        .then(function() {
          Alert.spinner.open()
          return rebuild(device)
        })
        .then(function() {
          return reset(device)
        })
        .then(function() {
          Alert.notify.success('Rebuild and Reset Commands Sent to Device')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function edit(device) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'vdm',
        'templates',
        ctrl.template.id,
        'device'
      ).search({ deviceName: device.deviceName, name: ctrl.template.name })
    }
  }
})()
