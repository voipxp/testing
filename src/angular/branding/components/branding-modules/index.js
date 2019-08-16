import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingModules', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = ['BrandingModuleService', 'Alert']
function controller(BrandingModuleService, Alert) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.update = update

  function onInit() {
    ctrl.loading = true
    loadModules()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModules() {
    return BrandingModuleService.index(ctrl.hostnameId).then(function(data) {
      ctrl.modules = data
    })
  }

  function edit(module) {
    ctrl.editModule = angular.copy(module)
    Alert.modal.open('editModuleModal', function(close) {
      update(ctrl.editModule, close)
    })
  }

  function update(module, callback) {
    Alert.spinner.open()
    BrandingModuleService.update(module)
      .then(loadModules)
      .then(function() {
        Alert.notify.success('Module Updated')
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
