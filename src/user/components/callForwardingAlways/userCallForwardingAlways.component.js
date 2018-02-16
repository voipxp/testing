;(function() {
  angular.module('odin.user').component('userCallForwardingAlways', {
    templateUrl:
      'user/components/callForwardingAlways/userCallForwardingAlways.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    $location,
    $q,
    Alert,
    UserCallForwardingAlwaysService,
    Module
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit

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

    function loadSettings() {
      return UserCallForwardingAlwaysService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function loadModule() {
      return Module.show('Call Forwarding Always').then(function(data) {
        ctrl.module = data
      })
    }

    function edit() {
      console.log(
        'ctrl.settings.forwardToPhoneNumber',
        ctrl.settings.forwardToPhoneNumber
      )
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserCallForwardingAlways', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserCallForwardingAlwaysService.update(ctrl.userId, settings)
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
