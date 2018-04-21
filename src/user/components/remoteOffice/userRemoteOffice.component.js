;(function() {
  angular.module('odin.user').component('userRemoteOffice', {
    templateUrl: 'user/components/remoteOffice/userRemoteOffice.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserRemoteOfficeService, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserRemoteOfficeService.options

    function onInit() {
      ctrl.loading = true
      $q
        .all([loadSettings(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Remote Office').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserRemoteOfficeService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserRemoteOffice', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserRemoteOfficeService.update(ctrl.userId, settings)
        .then(loadSettings)
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
  }
})()
