;(function() {
  angular.module('odin.user').component('userBroadWorksAnywhere', {
    templateUrl:
      'user/components/broadWorksAnywhere/components/broadWorksAnywhere.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, $routeParams, UserBroadWorksAnywhereService, ACL) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.edit = edit
    ctrl.reload = loadSettings

    function onInit() {
      ctrl.loading = true
      loadSettings()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserBroadWorksAnywhereService.show(ctrl.userId).then(function(
        data
      ) {
        console.log('settings', data)
        ctrl.settings = data
        return data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserBroadworksAnywhere', function onSave(close) {
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
      UserBroadWorksAnywhereService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
