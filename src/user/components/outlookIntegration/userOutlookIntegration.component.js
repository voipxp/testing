;(function() {
  angular.module('odin.user').component('userOutlookIntegration', {
    templateUrl:
      'user/components/outlookIntegration/userOutlookIntegration.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserOutlookIntegrationService, ACL, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutlookIntegrationService.options
    ctrl.hasPermission = ACL.has

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Outlook Integration').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserOutlookIntegrationService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserOutlookIntegration', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      if (ACL.is('User')) {
        delete settings.isActive
        delete settings.mobilePhoneNumber
        delete settings.useSettingLevel
        delete settings.denyCallOriginations
        delete settings.denyCallTerminations
      }

      Alert.spinner.open()
      UserOutlookIntegrationService.update(ctrl.userId, settings)
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
