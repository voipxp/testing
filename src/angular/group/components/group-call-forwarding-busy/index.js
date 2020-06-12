import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCallForwardingBusy', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'UserCallForwardingBusyService', '$q', 'Module']
function controller(Alert, UserCallForwardingBusyService, $q, Module) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.onSelect = onSelect
  ctrl.options = UserCallForwardingBusyService.options

  ctrl.columns = [
    {
      key: 'user.userId',
      label: 'User ID'
    },
    {
      key: 'user.firstName',
      label: 'First Name'
    },
    {
      key: 'user.lastName',
      label: 'Last Name'
    },
    {
      key: 'user.phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'data.isActive',
      label: 'Active',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'data.forwardToPhoneNumber',
      label: 'Forward To'
    }
  ]

  function onInit() {
    ctrl.loading = true
    return $q
      .all([load(),loadModule()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return UserCallForwardingBusyService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.users = _.filter(data, function(item) {
        return _.get(item, 'service.assigned')
      })
    })
  }

  function loadModule() {
    return Module.show('Call Forwarding Busy').then(function(data) {
      ctrl.module = data
    })
  }
  
  function onClick(event) {
    ctrl.editSettings = angular.copy(event.data)
    ctrl.editTitle = event.user.userId
    Alert.modal.open('editUserCallForwardingBusy', function(close) {
      update(event.user.userId, ctrl.editSettings, close)
    })
  }

  function onSelect(event) {
    var users = _.map(event, 'user')
    ctrl.editSettings = {}
    ctrl.editTitle = users.length + ' Users'
    Alert.modal.open('editUserCallForwardingBusy', function(close) {
      bulk({ data: ctrl.editSettings, users: users }, close)
    })
  }

  function update(userId, settings, callback) {
    Alert.spinner.open()
    UserCallForwardingBusyService.update(userId, settings)
      .then(load)
      .then(function() {
        Alert.notify.success('User Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function bulk(data, callback) {
    Alert.spinner.open()
    UserCallForwardingBusyService.bulk(data)
      .then(load)
      .then(function() {
        Alert.notify.success('Bulk Settings Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
