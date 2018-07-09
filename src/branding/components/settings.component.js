;(function() {
  angular.module('odin.branding').component('brandingSettings', {
    templateUrl: 'branding/components/settings.component.html',
    controller: Controller,
    bindings: { hostnameId: '<' }
  })

  function Controller(BrandingSettingService, Alert, Setting) {
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
      var update = {}
      update[field.key] = field.value
      BrandingSettingService.update(ctrl.hostnameId, update)
        .then(loadSetting)
        .then(Setting.load)
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
})()
