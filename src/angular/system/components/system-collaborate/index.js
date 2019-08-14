import angular from 'angular'
import template from './index.html'

angular.module('odin.system').component('systemCollaborate', { template, controller })

controller.$inject = ['Alert', 'SystemCollaborateService']
function controller(Alert, SystemCollaborateService) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = SystemCollaborateService.options

  function onInit() {
    ctrl.loading = true
    loadCollaborate()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadCollaborate() {
    return SystemCollaborateService.show().then(function(data) {
      ctrl.collaborate = data
      return data
    })
  }

  function edit() {
    loadCollaborate()
      .then(function() {
        ctrl.showOptional = false
        ctrl.editCollaborate = angular.copy(ctrl.collaborate)
        Alert.modal.open('editSystemCollaborate', function(close) {
          update(ctrl.editCollaborate, close)
        })
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
  }
  function update(collaborate, callback) {
    Alert.spinner.open()
    SystemCollaborateService.update(collaborate)
      .then(loadCollaborate)
      .then(function() {
        Alert.notify.success('System Collaborate Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
