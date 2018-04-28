;(function() {
  angular.module('odin.bulk').component('bulkSelectUcOneDevices', {
    templateUrl:
      'bulk/components/user.ucone.update/bulkSelectUcOneDevices.component.html',
    controller: Controller,
    bindings: { devices: '<', onUpdate: '&' }
  })

  function Controller(EventEmitter, Alert, UcOneService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.next = next
    ctrl.toggle = toggle
    ctrl.isSelected = isSelected

    function onInit() {
      ctrl.loading = true
      ctrl.devices = ctrl.devices || []
      loadDevices()
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function isSelected(device) {
      return _.find(ctrl.devices, { deviceType: device.deviceType })
    }

    function toggle(device) {
      if (isSelected(device)) {
        _.remove(ctrl.devices, device)
      } else {
        ctrl.devices.push(device)
      }
    }

    function loadDevices() {
      return UcOneService.devices().then(function(data) {
        console.log('devices', data)
        ctrl.deviceTypes = data
      })
    }

    function next() {
      ctrl.onUpdate(EventEmitter({ devices: ctrl.devices }))
    }
  }
})()
