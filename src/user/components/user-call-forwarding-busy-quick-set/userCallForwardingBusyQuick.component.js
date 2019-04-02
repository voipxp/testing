;(function() {
  angular.module('odin.user').component('userCallForwardingBusyQuickSet', {
    templateUrl:
      'user/components/callForwardingBusy/userCallForwardingBusyQuick.component.html',
    controller: Controller,
    bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, UserCallForwardingBusyService, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.toggle = toggle

    function onInit() {
      ctrl.loading = true
      loadSettings()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
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
        return Route.open(
          'users',
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.userId,
          'callForwardingBusy'
        )
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
  }
})()
