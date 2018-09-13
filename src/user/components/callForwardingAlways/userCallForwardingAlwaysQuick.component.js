;(function() {
  angular.module('odin.user').component('userCallForwardingAlwaysQuickSet', {
    templateUrl:
      'user/components/callForwardingAlways/userCallForwardingAlwaysQuick.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserCallForwardingAlwaysService, Route) {
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
      return UserCallForwardingAlwaysService.show(ctrl.userId).then(function(
        data
      ) {
        console.log('settings', ctrl.settings)
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
          'callForwardingAlways'
        )
      }
      ctrl.loading = true
      UserCallForwardingAlwaysService.update(ctrl.userId, ctrl.settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Call Forwarding Always Updated')
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
