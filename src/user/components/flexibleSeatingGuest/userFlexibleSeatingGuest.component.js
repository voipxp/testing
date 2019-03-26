;(function() {
  angular.module('odin.user').component('userFlexibleSeatingGuest', {
    templateUrl:
      'user/components/flexibleSeatingGuest/userFlexibleSeatingGuest.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserFlexibleSeatingGuestService, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadModule()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Flexible Seating Guest').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserFlexibleSeatingGuestService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      ctrl.editSettings.accessDeviceEndpoint = ''
      Alert.modal.open('editUserFlexibleSeatingGuest', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      if (!settings.userId) settings.userId = ctrl.userId
      UserFlexibleSeatingGuestService.update(settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) {
            callback()
          }
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
