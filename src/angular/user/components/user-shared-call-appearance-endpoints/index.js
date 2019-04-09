import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userSharedCallAppearanceEndpoints', {
  template,
  controller,
  bindings: {
    userId: '<',
    groupId: '<',
    serviceProviderId: '<',
    sharedCallAppearance: '<'
  },
  require: {
    parent: '^userSharedCallAppearanceAdmin'
  }
})

controller.$inject = [
  'Alert',
  'UserSharedCallAppearanceEndpointService',
  '$scope'
]
function controller(Alert, UserSharedCallAppearanceEndpointService, $scope) {
  var ctrl = this
  ctrl.$onChanges = onChanges
  ctrl.add = add
  ctrl.onSetLinePort = onSetLinePort
  ctrl.edit = edit
  ctrl.endpointName = endpointName
  ctrl.selectDevice = selectDevice
  ctrl.createDevice = createDevice
  ctrl.updateDevice = updateDevice
  ctrl.onUpdateDevice = onUpdateDevice
  ctrl.onSelectDevice = onSelectDevice

  function onChanges(changes) {
    if (changes.userId) {
      ctrl.userId = changes.userId.currentValue
    }
    if (changes.groupId) {
      ctrl.groupId = changes.groupId.currentValue
    }
    if (changes.serviceProviderId) {
      ctrl.serviceProviderId = changes.serviceProviderId.currentValue
    }
    if (changes.sharedCallAppearance) {
      ctrl.sharedCallAppearance = changes.sharedCallAppearance.currentValue
    }
  }

  function loadEndpoint(endpoint) {
    return UserSharedCallAppearanceEndpointService.show(ctrl.userId, endpoint)
  }

  function endpointName(endpoint) {
    if (!endpoint) return
    if (endpoint.deviceName && endpoint.deviceLevel) {
      return endpoint.deviceName + ' (' + endpoint.deviceLevel + ')'
    }
  }

  function add() {
    var max = _.get(ctrl.sharedCallAppearance, 'maxAppearances', 0)
    var cur = _.get(ctrl.sharedCallAppearance, 'endpoints.length', 0)
    if (cur >= max) {
      Alert.notify.danger(
        'Not enough Shared Call Appearance licenses available to create an endpoint'
      )
      return
    }
    ctrl.newEndpoint = {
      userId: ctrl.userId,
      linePort: '',
      isActive: true,
      allowOrigination: true,
      allowTermination: true
    }
    Alert.modal.open(
      'userSharedCallAppearanceEndpointCreateModal',
      function onSave(close) {
        create(ctrl.newEndpoint, close)
      }
    )
  }

  function onSetLinePort(event) {
    _.set(ctrl.newEndpoint, 'linePort', event.userId)
  }

  function edit(endpoint) {
    Alert.spinner.open()
    loadEndpoint(endpoint)
      .then(function(data) {
        ctrl.editEndpoint = data
        Alert.modal.open(
          'userSharedCallAppearanceEndpointEditModal',
          function onSave(close) {
            update(ctrl.editEndpoint, close)
          },
          function onDelete(close) {
            Alert.confirm
              .open('Are you sure you want to remove this Endpoint?')
              .then(function() {
                remove(ctrl.editEndpoint, close)
              })
          }
        )
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function update(endpoint, callback) {
    Alert.spinner.open()
    UserSharedCallAppearanceEndpointService.update(ctrl.userId, endpoint)
      .then(ctrl.parent.reload)
      .then(function() {
        Alert.notify.success('Endpoint Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function remove(endpoint, callback) {
    Alert.spinner.open()
    return UserSharedCallAppearanceEndpointService.destroy(
      ctrl.userId,
      endpoint
    )
      .then(ctrl.parent.reload)
      .then(function() {
        Alert.notify.success('Endpoint Removed')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function create(endpoint, callback) {
    Alert.spinner.open()
    UserSharedCallAppearanceEndpointService.store(ctrl.userId, endpoint)
      .then(ctrl.parent.reload)
      .then(function() {
        Alert.notify.success('Endpoint Created')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function createDevice() {
    $scope.$broadcast('deviceCreate:load')
  }

  function selectDevice() {
    $scope.$broadcast('deviceSelect:load')
  }

  function updateDevice(endpoint) {
    $scope.$broadcast('deviceUpdate:load', {
      deviceName: endpoint.deviceName,
      deviceLevel: endpoint.deviceLevel
    })
  }

  function onSelectDevice(event) {
    var device = event.device || {}
    ctrl.newEndpoint.deviceName = device.deviceName
    ctrl.newEndpoint.deviceLevel = device.deviceLevel
  }

  function onUpdateDevice() {
    ctrl.parent.reload()
  }
}
