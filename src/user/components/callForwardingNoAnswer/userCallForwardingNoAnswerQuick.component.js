;(function() {
  angular.module('odin.user').component('userCallForwardingNoAnswerQuickSet', {
    templateUrl:
      'user/components/callForwardingNoAnswer/userCallForwardingNoAnswerQuick.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserCallForwardingNoAnswerService, Route) {
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
      return UserCallForwardingNoAnswerService.show(ctrl.userId).then(function(
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
          'callForwardingNoAnswer'
        )
      }
      ctrl.loading = true
      UserCallForwardingNoAnswerService.update(ctrl.userId, ctrl.settings)
        .then(loadSettings)
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
  }
})()