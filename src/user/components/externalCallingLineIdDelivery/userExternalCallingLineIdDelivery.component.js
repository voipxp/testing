;(function() {
  angular.module('odin.user').component('userExternalCallingLineIdDelivery', {
    templateUrl:
      'user/components/externalCallingLineIdDelivery/userExternalCallingLineIdDelivery.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    UserExternalCallingLineIdDeliveryService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.callTransfer = {}
    ctrl.options = UserExternalCallingLineIdDeliveryService.options

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
