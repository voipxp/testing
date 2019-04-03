import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('guestAssociationFlexibleSeating', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    serviceUserId: '<',
    readOnly: '<',
    loading: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  '$q',
  'GroupFlexibleSeatingHostGuestAssociationService'
]
function controller(
  Alert,
  $q,
  GroupFlexibleSeatingHostGuestAssociationService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = GroupFlexibleSeatingHostGuestAssociationService.options

  function onInit() {
    ctrl.loading = true
    return $q
      .all([load()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function activate() {
    Alert.spinner.open()
    return $q
      .all([load()])
      .catch(function(error) {
        Alert.notify.danger(error)
        return $q.reject(error.data)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function load() {
    return GroupFlexibleSeatingHostGuestAssociationService.show(
      ctrl.serviceUserId
    ).then(function(data) {
      ctrl.settings = data
      return data
    })
  }

  function edit() {
    activate().then(function() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editGuestAssociationFlexibleSeating', function(close) {
        sendUpdate(ctrl.editSettings, close)
      })
    })
  }

  function sendUpdate(settings, callback) {
    Alert.spinner.open()
    settings.serviceUserId = ctrl.serviceUserId
    GroupFlexibleSeatingHostGuestAssociationService.update(settings)
      .then(load)
      .then(function() {
        Alert.notify.success('Guest Association updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
    // ctrl.onUpdate(EventEmitter({ settings: settings, callback: callback }))
  }
}
