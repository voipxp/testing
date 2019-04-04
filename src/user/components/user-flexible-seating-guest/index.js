import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userFlexibleSeatingGuest', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserFlexibleSeatingGuestService',
  '$q',
  'Module'
]
function controller(Alert, UserFlexibleSeatingGuestService, $q, Module) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.onChangeHost = onChangeHost

  function onInit() {
    ctrl.loading = true
    $q.all([loadHosts(), loadSettings(), loadModule()])
      .then(function() {
        console.log(ctrl.settings)
        console.log(ctrl.settings.hostUserId)
        if (ctrl.settings.hostUserId) {
          ctrl.hosts.push({
            userId: ctrl.settings.hostUserId,
            department: '',
            emailAddress: '',
            // enableAssociationLimit: data.enableAssociationLimit,
            enableAssociationLimit: ctrl.settings.hostEnforcesAssociationLimit,
            extension: '',
            firstName: ctrl.settings.hostFirstName,
            hiraganaFirstName: '',
            hiraganaLastName: '',
            lastName: ctrl.settings.hostLastName,
            phoneNumber: '',
            // hostAssociationDateTime: data.hostAssociationDateTime,
            associationLimitHours: ctrl.settings.hostAssociationLimitHours
          })
        } else {
          ctrl.settings.hostUserUd
        }
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Flexible Seating Guest').then(function(data) {
      ctrl.module = data
    })
  }

  function loadHosts() {
    return UserFlexibleSeatingGuestService.index(ctrl.userId).then(function(
      data
    ) {
      ctrl.hosts = data.users
      console.log('ctrl.hosts', ctrl.hosts)
    })
  }

  function loadSettings() {
    return UserFlexibleSeatingGuestService.show(ctrl.userId).then(function(
      data
    ) {
      ctrl.settings = data
      formatHostAssociationDateTime(data)
    })
  }
  function formatHostAssociationDateTime(settings) {
    if (ctrl.settings.hostAssociationDateTime) {
      var dt = new Date(settings.hostAssociationDateTime)
      settings.hostAssociationDateTimeReadable = dt.toString()
      dt.setHours(dt.getHours() + settings.hostAssociationLimitHours)
      settings.hostAssociationDateTimeExpireReadable = dt.toString()
    }
  }
  function edit() {
    ctrl.editSettings = angular.copy(ctrl.settings)
    // ctrl.hosts = angular.copy(ctrl.hosts)
    ctrl.editSettings.accessDeviceEndpoint = ''
    Alert.modal.open('editUserFlexibleSeatingGuest', function onSave(close) {
      update(ctrl.editSettings, close)
    })
  }

  function onChangeHost(item) {
    console.log('onChangeHost(item)', item)
    if (!item) return
    var host = _.find(ctrl.hosts, ['userId', item])
    ctrl.editSettings.hostAssociationLimitHours = host.associationLimitHours
    ctrl.editSettings.associationLimitHours = host.associationLimitHours
    ctrl.editSettings.hostUserId = item
  }
  function update(settings, callback) {
    Alert.spinner.open()
    if (!settings.userId) settings.userId = ctrl.userId
    UserFlexibleSeatingGuestService.update(settings)
      .then(onInit)
      .then(loadSettings)
      .then(function() {
        Alert.notify.success('Settings Updated')
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
