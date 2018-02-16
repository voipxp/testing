;(function() {
  angular.module('odin.user').component('userCallForwardingNotReachable', {
    templateUrl:
      'user/components/callForwardingNotReachable/userCallForwardingNotReachable.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    UserCallForwardingNotReachableService,
    $routeParams
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

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
      return UserCallForwardingNotReachableService.show(ctrl.userId).then(
        function(data) {
          ctrl.settings = data
          console.log('settings', data)
        }
      )
    }

    function edit() {
      console.log(
        'ctrl.settings.forwardToPhoneNumber',
        ctrl.settings.forwardToPhoneNumber
      )
      ctrl.editSettings = angular.copy(ctrl.settings)
      // We aren't updated callCenters here
      // delete ctrl.editSettings.callCenters;
      Alert.modal.open('editUserCallForwardingNotReachable', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      Alert.spinner.open()
      UserCallForwardingNotReachableService.update(ctrl.userId, settings)
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
