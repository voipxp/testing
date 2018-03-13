;(function() {
  angular.module('odin.common').component('userVoiceMessagingGreetings', {
    templateUrl:
      'common/components/userVoiceMessagingGreetings/greetings.component.html',
    controller: Controller,
    bindings: { userId: '=', readOnly: '<' }
  })

  function Controller(Alert, UserVoiceMessagingGreetingService) {
    var ctrl = this

    ctrl.options = UserVoiceMessagingGreetingService.options
    ctrl.edit = edit
    ctrl.update = update
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      return loadSettings()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserVoiceMessagingGreetingService.show(ctrl.userId).then(function(
        data
      ) {
        console.log('settings', data)
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserVoiceMessagingGreetings', function(close) {
        return update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      return UserVoiceMessagingGreetingService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Greetings Saved')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
