import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDeviceUsers', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    deviceName: '<'
  }
})

controller.$inject = ['Alert', 'GroupDeviceService', 'Route']
function controller(Alert, GroupDeviceService, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick

  ctrl.columns = [
    {
      key: 'userId',
      label: 'User ID'
    },
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'extension',
      label: 'Extension'
    }
  ]

  function onInit() {
    ctrl.loading = true
    loadUsers()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onClick(user) {
    Route.open(
      'users',
      user.serviceProviderId,
      user.groupId,
      user.userId,
      'device-endpoint'
    )
  }

  function loadUsers() {
    return GroupDeviceService.users(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.deviceName
    ).then(function(data) {
      ctrl.users = data
    })
  }
}
