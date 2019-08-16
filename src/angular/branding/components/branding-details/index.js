import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingDetails', {
  template,
  controller,
  bindings: { hostnameId: '<', onUpdate: '&' }
})

controller.$inject = ['BrandingHostnameService', 'Route', 'Alert', 'EventEmitter']
function controller(BrandingHostnameService, Route, Alert, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.update = update
  ctrl.remove = remove

  function onInit() {
    ctrl.loading = true
    loadHostname()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadHostname() {
    return BrandingHostnameService.show(ctrl.hostnameId).then(function(data) {
      ctrl.hostname = data
      sendUpdate(ctrl.hostname)
    })
  }

  function edit() {
    ctrl.editHostname = angular.copy(ctrl.hostname)
    Alert.modal.open(
      'editHostnameModal',
      function(close) {
        update(ctrl.editHostname, close)
      },
      function(close) {
        remove(ctrl.editHostname, close)
      }
    )
  }

  function update(hostname, callback) {
    Alert.spinner.open()
    BrandingHostnameService.update(hostname)
      .then(function(data) {
        ctrl.hostname = data
        sendUpdate(data)
      })
      .then(function() {
        Alert.notify.success('Hostname Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function remove(hostname, callback) {
    Alert.confirm.open('Are you sure you want to remove this hostname?').then(function() {
      Alert.spinner.open()
      BrandingHostnameService.destroy(hostname.id)
        .then(function() {
          Alert.notify.warning('Hostname Removed')
          callback()
          Route.open('branding')
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    })
  }

  function sendUpdate(hostname) {
    ctrl.onUpdate(EventEmitter({ hostname: hostname }))
  }
}
