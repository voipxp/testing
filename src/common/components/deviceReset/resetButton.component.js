;(function() {
  angular.module('odin.common').component('deviceResetButton', {
    templateUrl: 'common/components/deviceReset/resetButton.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      device: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    Alert,
    GroupDeviceConfigService,
    HashService,
    $scope,
    EventEmitter
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.reset = reset
    ctrl.rebuild = rebuild
    ctrl.both = both

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function rebuild() {
      confirm('Rebuild')
        .then(function() {
          Alert.spinner.open()
        })
        .then(rebuildDevice)
        .then(function() {
          sendUpdate('Rebuild')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function reset() {
      confirm('Reset')
        .then(function() {
          Alert.spinner.open()
        })
        .then(resetDevice)
        .then(function() {
          sendUpdate('Reset')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function both() {
      confirm('Rebuild and Reset')
        .then(function() {
          Alert.spinner.open()
        })
        .then(rebuildDevice)
        .then(resetDevice)
        .then(function() {
          sendUpdate('Rebuild and Reset')
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function confirm(type) {
      return Alert.confirm.open(
        'Are you sure you want to ' + type + ' this device?'
      )
    }

    function rebuildDevice() {
      return GroupDeviceConfigService.rebuild(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.device
      )
    }

    function resetDevice() {
      return GroupDeviceConfigService.reset(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.device
      )
    }

    function sendUpdate(message) {
      Alert.notify.success(message + ' command sent to device')
      ctrl.onUpdate(EventEmitter({ device: ctrl.device }))
      ctrl.isActive = false
    }
  }
})()
