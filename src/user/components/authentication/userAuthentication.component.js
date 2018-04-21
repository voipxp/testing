;(function() {
  angular.module('odin.user').component('userAuthentication', {
    templateUrl:
      'user/components/authentication/userAuthentication.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserAuthenticationService, Module, $q) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserAuthenticationService.options

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadSettings(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Authentication').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserAuthenticationService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserAuthentication', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      if (!settings.newPassword && !settings.newPasswordCheck) {
        delete settings.newPassword
      } else {
        if (settings.newPassword !== settings.newPasswordCheck) {
          Alert.notify.danger('passwords do not match.')
          return
        }
      }
      Alert.spinner.open()
      UserAuthenticationService.update(ctrl.userId, settings)
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
