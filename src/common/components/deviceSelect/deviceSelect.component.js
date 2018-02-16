;(function() {
  angular.module('odin.common').component('deviceSelect', {
    templateUrl: 'common/components/deviceSelect/deviceSelect.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      params: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    Alert,
    $q,
    GroupDeviceService,
    HashService,
    EventEmitter,
    $scope
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.select = select

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function onChanges(changes) {
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
    }

    function loadDevices() {
      return GroupDeviceService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'available',
        ctrl.params
      ).then(function(data) {
        ctrl.devices = data
      })
    }

    function load() {
      Alert.spinner.open()
      return loadDevices()
        .then(function() {
          Alert.modal.open(ctrl.modalId)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function select(device) {
      ctrl.search = ''
      Alert.modal.close(ctrl.modalId)
      ctrl.onUpdate(EventEmitter({ device: device }))
    }

    $scope.$on('deviceSelect:load', load)
  }
})()
