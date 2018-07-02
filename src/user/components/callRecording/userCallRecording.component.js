;(function() {
  angular.module('odin.user').component('userCallRecording', {
    templateUrl:
      'user/components/callRecording/userCallRecording.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserCallRecordingService, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserCallRecordingService.options

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
      return Module.show('Call Recording').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserCallRecordingService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      console.log('ctrl.settings:', ctrl.settings)
      ctrl.editSettings = angular.copy(ctrl.settings)
      console.log('ctrl.editSettings:', ctrl.editSettings)
      Alert.modal.open('editUserCallRecording', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      console.log('ctrl.userId', ctrl.userId)
      Alert.spinner.open()
      UserCallRecordingService.update(ctrl.userId, settings)
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
