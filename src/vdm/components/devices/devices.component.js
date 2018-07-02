;(function() {
  angular.module('odin.vdm').component('vdmDevices', {
    templateUrl: 'vdm/components/devices/devices.component.html',
    controller: Controller,
    bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(
    Alert,
    Route,
    VdmGroupDeviceService,
    VdmGroupTemplateService,
    VdmGroupTemplateDeviceService,
    GroupDeviceService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.assign = openAssign
    ctrl.rebuildReset = rebuildReset
    ctrl.edit = edit

    ctrl.columns = [
      {
        key: 'deviceName',
        label: 'Device Name'
      },
      {
        key: 'deviceType',
        label: 'Device Type'
      },
      {
        key: 'template.name',
        label: 'Template'
      }
    ]

    function onInit() {
      ctrl.loading = true
      $q.all([loadDevices(), loadGroupTemplates()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevices() {
      return VdmGroupDeviceService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('devices', data)
        ctrl.devices = data
      })
    }

    function loadGroupTemplates() {
      return VdmGroupTemplateService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('templates', data)
        ctrl.templates = data
      })
    }

    function openAssign(device) {
      ctrl.editDevice = angular.copy(device)
      ctrl.availableTemplates = _.filter(ctrl.templates, {
        deviceType: device.deviceType
      })
      Alert.modal.open('editVdmDevicesAssignModal', function(close) {
        assign(ctrl.editDevice, close)
      })
    }

    function assign(device, callback) {
      if (!device.template.id) return callback()
      Alert.spinner.open()
      VdmGroupTemplateDeviceService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device.template.id,
        device.deviceName
      )
        .then(loadDevices)
        .then(function() {
          callback()
          Alert.notify.success('Template Assigned')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function rebuild(device) {
      return GroupDeviceService.rebuild(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device
      )
    }

    function reset(device) {
      return GroupDeviceService.reset(
        ctrl.serviceProviderId,
        ctrl.groupId,
        device
      )
    }

    function rebuildReset(device) {
      Alert.confirm
        .open(
          'Are you sure you want to rebuild and reset ' +
            device.deviceName +
            ' ?'
        )
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
      if (!device.template) return
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'vdm',
        'templates',
        device.template.id,
        device.deviceName
      )().search({ name: device.template.name })
    }
  }
})()
