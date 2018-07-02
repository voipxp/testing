;(function() {
  angular.module('odin.user').component('userCallTransfer', {
    templateUrl: 'user/components/callTransfer/userCallTransfer.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserCallTransferService, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.callTransfer = {}
    ctrl.options = UserCallTransferService.options
    ctrl.recallNumberOfRings =
      UserCallTransferService.options.recallNumberOfRings
    ctrl.minBusyCampOnSeconds =
      UserCallTransferService.options.minBusyCampOnSeconds
    ctrl.maxBusyCampOnSeconds =
      UserCallTransferService.options.maxBusyCampOnSeconds

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
      return Module.show('Call Transfer').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserCallTransferService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserCallTransfer', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserCallTransferService.update(ctrl.userId, settings)
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
