;(function() {
  angular.module('odin.user').component('userCallForwardingNoAnswer', {
    templateUrl:
      'user/components/callForwardingNoAnswer/userCallForwardingNoAnswer.component.html',
    controller: Controller,
    bindings: { userId: '<', showQuick: '<' }
  })

  function Controller(Alert, UserCallForwardingNoAnswerService, Module, $q) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.toggle = toggle
    ctrl.options = UserCallForwardingNoAnswerService.options

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
      return Module.show('Call Forwarding No Answer').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserCallForwardingNoAnswerService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserCallForwardingNoAnswer', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function toggle() {
      if (!ctrl.settings.forwardToPhoneNumber) {
        Alert.notify.warning('Please Configure a Phone Number')
        ctrl.settings.isActive = !ctrl.settings.isActive
        return edit()
      }
      ctrl.loading = true
      UserCallForwardingNoAnswerService.update(ctrl.userId, ctrl.settings)
        // .then(loadSettings)
        .then(function(data) {
          ctrl.settings = data
        })
        .then(function() {
          Alert.notify.success('Call Forwarding No Answer Updated')
        })
        .catch(function(error) {
          ctrl.settings.isActive = !ctrl.settings.isActive
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserCallForwardingNoAnswerService.update(ctrl.userId, settings)
        // .then(loadSettings)
        .then(function(data) {
          ctrl.settings = data
        })
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
