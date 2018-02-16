;(function() {
  angular.module('odin.user').component('userOutlookIntegration', {
    templateUrl:
      'user/components/outlookIntegration/userOutlookIntegration.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, UserOutlookIntegrationService, ACL, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.options = UserOutlookIntegrationService.options
    ctrl.hasPermission = ACL.has

    function onInit() {
      ctrl.loading = true
      loadSettings()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserOutlookIntegrationService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserOutlookIntegration', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      if (ACL.is('User')) {
        delete settings.isActive
        delete settings.mobilePhoneNumber
        delete settings.useSettingLevel
        delete settings.denyCallOriginations
        delete settings.denyCallTerminations
        console.log('USER', settings)
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
