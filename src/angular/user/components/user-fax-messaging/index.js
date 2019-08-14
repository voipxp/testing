import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userFaxMessaging', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserFaxMessagingService',
  'ACL',
  '$q',
  'GroupNumberService',
  'GroupDomainService',
  'Module'
]
function controller(
  Alert,
  UserFaxMessagingService,
  ACL,
  $q,
  GroupNumberService,
  GroupDomainService,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.hasPermission = ACL.has
  ctrl.options = UserFaxMessagingService.options
  ctrl.setExtension = setExtension
  ctrl.mysplit = mysplit
  ctrl.shitsplit = shitsplit
  ctrl.domains = []

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadSettings(), loadModule()])
      .then(function() {
        return $q.all([loadDomains(), loadAvailableNumbers()])
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Fax Messaging').then(function(data) {
      ctrl.module = data
    })
  }

  function loadSettings() {
    return UserFaxMessagingService.show(ctrl.userId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    Alert.modal.open('editUserFaxMessaging', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserFaxMessagingService.update(ctrl.userId, settings)
      .then(onInit)
      .then(function() {
        Alert.notify.success('Settings Updated')
        if (_.isFunction(callback)) callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function loadDomains() {
    if (!ACL.has('Group')) {
      ctrl.domains = []
      return $q.resolve()
    }
    return GroupDomainService.index(ctrl.serviceProviderId, ctrl.groupId).then(function(data) {
      ctrl.domains = data
      return data
    })
  }

  function loadAvailableNumbers() {
    if (!ACL.has('Group')) {
      ctrl.availableNumbers = []
      return $q.resolve()
    }
    return GroupNumberService.index(ctrl.serviceProviderId, ctrl.groupId, 'available').then(
      function(data) {
        ctrl.availableNumbers = data
        if (ctrl.settings.phoneNumber) {
          ctrl.availableNumbers.push({
            assigned: true,
            activated: true,
            min: ctrl.settings.phoneNumber,
            max: null
          })
        }
        return ctrl.availableNumbers
      }
    )
  }

  function setExtension() {
    var extension = ctrl.editSettings.phoneNumber ? ctrl.editSettings.phoneNumber.slice(-4) : null
    ctrl.editSettings.extension = extension
  }

  function shitsplit(input, splitChar) {
    return input.split(splitChar)
  }

  function mysplit(input, splitChar, splitIndex) {
    return input.split(splitChar)[splitIndex]
  }
}
