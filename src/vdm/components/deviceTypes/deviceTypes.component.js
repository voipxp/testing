;(function() {
  angular.module('odin.vdm').component('vdmDeviceTypes', {
    templateUrl: 'vdm/components/deviceTypes/deviceTypes.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, Route, VdmDeviceTypeService, $scope) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.edit = edit
    ctrl.selectDevice = selectDevice
    ctrl.onSelectDevice = onSelectDevice

    ctrl.options = VdmDeviceTypeService.options

    function onInit() {
      ctrl.loading = true
      loadDevices()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadDevices() {
      return VdmDeviceTypeService.index().then(function(data) {
        console.log('devices', data)
        ctrl.devices = data
      })
    }

    function selectDevice() {
      $scope.$broadcast('vdmCreateDevice:load')
    }

    function onSelectDevice(event) {
      var deviceType = _.get(event, 'device.deviceType')
      ctrl.editDevice.deviceType = deviceType
    }

    function edit(device) {
      ctrl.editDevice = device
      Alert.modal.open(
        'editVdmDeviceTypeModal',
        function(close) {
          update(ctrl.editDevice, close)
        },
        function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this deviceType?')
            .then(function() {
              destroy(ctrl.editDevice, close)
            })
        }
      )
    }

    function add() {
      ctrl.editDevice = {}
      Alert.modal.open('editVdmDeviceTypeModal', function(close) {
        create(ctrl.editDevice, close)
      })
    }

    function create(device, callback) {
      Alert.spinner.open()
      VdmDeviceTypeService.store(device)
        .then(loadDevices)
        .then(function() {
          Alert.notify.success('Device Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(device, callback) {
      Alert.spinner.open()
      VdmDeviceTypeService.update(device)
        .then(loadDevices)
        .then(function() {
          Alert.notify.success('Device Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(device, callback) {
      Alert.spinner.open()
      VdmDeviceTypeService.destroy(device.id)
        .then(loadDevices)
        .then(function() {
          Alert.notify.warning('Device Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
