;(function() {
  angular.module('odin.user').component('userInternalCallingLineIdDelivery', {
    templateUrl:
      'user/components/internalCallingLineIdDelivery/userInternalCallingLineIdDelivery.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    UserInternalCallingLineIdDeliveryService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.callTransfer = {}
    ctrl.options = UserInternalCallingLineIdDeliveryService.options

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
      return UserInternalCallingLineIdDeliveryService.show(ctrl.userId).then(
        function(data) {
          ctrl.settings = data
          console.log('settings', data)
        }
      )
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserInternalCallingLineIdDelivery', function(
        close
      ) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserInternalCallingLineIdDeliveryService.update(ctrl.userId, settings)
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
