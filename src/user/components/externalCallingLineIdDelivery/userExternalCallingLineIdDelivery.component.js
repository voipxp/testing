;(function() {
  angular.module('odin.user').component('userExternalCallingLineIdDelivery', {
    templateUrl:
      'user/components/externalCallingLineIdDelivery/userExternalCallingLineIdDelivery.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    UserExternalCallingLineIdDeliveryService,
    $q,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserExternalCallingLineIdDeliveryService.options

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
      return Module.show('External Calling Line ID Delivery').then(function(
        data
      ) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserExternalCallingLineIdDeliveryService.show(ctrl.userId).then(
        function(data) {
          ctrl.settings = data
          console.log('settings', data)
        }
      )
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserExternalCallingLineIdDelivery', function onSave(
        close
      ) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserExternalCallingLineIdDeliveryService.update(ctrl.userId, settings)
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
