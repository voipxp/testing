import angular from 'angular'
import template from './index.html'

angular.module('odin.branding').component('brandingSettings', {
  template,
  controller,
  bindings: { hostnameId: '<' }
})

controller.$inject = ['BrandingSettingService', 'Alert', 'UiSettingService']
function controller(BrandingSettingService, Alert, UiSettingService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.fields = {}
  ctrl.fields.number = [
    { key: 'sessionTimeout', label: 'Session Timeout (min)' }
  ]
  ctrl.fields.checkbox = [{ key: 'editCLID', label: 'Manual CLID Editing' }]

  function onInit() {
    ctrl.loading = true
    loadSetting()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadSetting() {
    return BrandingSettingService.show(ctrl.hostnameId).then(function(data) {
      ctrl.settings = data
    })
  }

  function edit(type, field) {
    ctrl.editField = angular.copy(field)
    ctrl.editField.value = ctrl.settings[field.key]
    ctrl.editField.type = type
    var id = 'editBrandingSetting-' + type
    Alert.modal.open(id, function(close) {
      update(ctrl.editField, close)
    })
  }

  function update(field, callback) {
    Alert.spinner.open()
    var update = { hostnameId: ctrl.hostnameId }
    update[field.key] = field.value
    BrandingSettingService.update(update)
      .then(loadSetting)
      .then(UiSettingService.load)
      .then(function() {
        Alert.notify.success('Setting Updated')
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
