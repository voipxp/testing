;(function() {
  angular.module('odin.user').component('userCallForwardingBusy', {
    templateUrl:
      'user/components/callForwardingBusy/userCallForwardingBusy.component.html',
    controller: Controller,
    bindings: { userId: '<', showQuick: '<' }
  })

  function Controller(Alert, UserCallForwardingBusyService, Module, $q) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.toggle = toggle

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadModule()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Call Forwarding Busy').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserCallForwardingBusyService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function toggle() {
      if (!ctrl.settings.forwardToPhoneNumber) {
        Alert.notify.warning('Please Configure a Phone Number')
        ctrl.settings.isActive = !ctrl.settings.isActive
        return ctrl.edit()
      }
      ctrl.loading = true
      UserCallForwardingBusyService.update(ctrl.userId, ctrl.settings)
        // .then(loadSettings)
        .then(function(data) {
          ctrl.settings = data
        })
        .then(function() {
          Alert.notify.success('Call Forwarding Busy Updated')
        })
        .catch(function(error) {
          ctrl.settings.isActive = !ctrl.settings.isActive
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserCallForwardingBusy', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserCallForwardingBusyService.update(ctrl.userId, settings)
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
