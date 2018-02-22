;(function() {
  angular.module('odin.user').component('userDevice', {
    templateUrl: 'user/components/addresses/device.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, $scope, UserService, ACL, Module) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.select = select

    ctrl.createDevice = createDevice
    ctrl.selectDevice = selectDevice
    ctrl.updateDevice = updateDevice
    ctrl.onDeviceUpdate = onDeviceUpdate
    ctrl.onDeviceSelect = onDeviceSelect
    ctrl.onSetLinePort = onSetLinePort

    ctrl.selectTrunkGroup = selectTrunkGroup
    ctrl.onSelectTrunkGroup = onSelectTrunkGroup
    ctrl.onSetTrunkLinePort = onSetTrunkLinePort

    ctrl.selectEnterpriseTrunk = selectEnterpriseTrunk
    ctrl.onSelectEnterpriseTrunk = onSelectEnterpriseTrunk

    ctrl.endpointTypes = {
      accessDeviceEndpoint: 'Identity/Device Profile',
      trunkAddressing: 'Trunking',
      none: 'None'
    }

    function onInit() {
      ctrl.loading = true
      ctrl.canEdit = ACL.has('Group') && Module.update('Provisioning')
      loadUser()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUser() {
      return UserService.show(ctrl.userId).then(function(data) {
        ctrl.user = data
      })
    }

    function updateEndpointType(user) {
      var type = user.endpointType
      if (type === 'accessDeviceEndpoint') {
        delete user.trunkAddressing
      } else if (type === 'trunkAddressing') {
        delete user.accessDeviceEndpoint
      } else if (type === 'none') {
        delete user.accessDeviceEndpoint
        delete user.trunkAddressing
      }
    }

    function createDevice() {
      $scope.$broadcast('deviceCreate:load')
    }

    function selectDevice() {
      $scope.$broadcast('deviceSelect:load')
    }

    function updateDevice() {
      $scope.$broadcast('deviceUpdate:load', {
        deviceName: ctrl.user.accessDeviceEndpoint.accessDevice.deviceName,
        deviceLevel: ctrl.user.accessDeviceEndpoint.accessDevice.deviceLevel
      })
    }

    function selectTrunkGroup() {
      $scope.$broadcast('selectTrunkGroup:load')
    }

    function selectEnterpriseTrunk() {
      $scope.$broadcast('selectEnterpriseTrunk:load')
    }

    function onDeviceUpdate(event) {
      _.set(ctrl.user, 'accessDeviceEndpoint.accessDevice', event.device)
    }

    function onDeviceSelect(event) {
      _.set(ctrl.editUser, 'accessDeviceEndpoint.accessDevice', event.device)
    }

    function onSetLinePort(event) {
      _.set(ctrl.editUser, 'accessDeviceEndpoint.linePort', event.userId)
    }

    function onSetTrunkLinePort(event) {
      _.set(
        ctrl.editUser,
        'trunkAddressing.trunkGroupDeviceEndpoint.linePort',
        event.userId
      )
    }

    function onSelectTrunkGroup(event) {
      var name = _.get(event, 'trunk.name')
      if (name) {
        _.set(
          ctrl.editUser,
          'trunkAddressing.trunkGroupDeviceEndpoint.name',
          name
        )
      } else {
        _.set(ctrl.editUser, 'trunkAddressing.trunkGroupDeviceEndpoint', null)
      }
    }

    function onSelectEnterpriseTrunk(event) {
      var name = _.get(event, 'trunk.enterpriseTrunk', null)
      if (name) {
        _.set(ctrl.editUser, 'trunkAddressing.enterpriseTrunkName', name)
      } else {
        _.set(ctrl.editUser, 'trunkAddressing.enterpriseTrunkName', null)
      }
    }

    // Select the device
    function select() {
      ctrl.editUser = angular.copy(ctrl.user)
      Alert.modal.open('userDeviceSelectModal', function onSave(close) {
        update(ctrl.editUser, close)
      })
    }

    function update(user, callback) {
      updateEndpointType(user)
      Alert.spinner.open()
      return UserService.update(ctrl.userId, user)
        .then(onInit)
        .then(function() {
          Alert.notify.success('User Updated')
          if (_.isFunction(callback)) {
            callback()
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }
  }
})()
