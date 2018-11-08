;(function() {
  angular.module('odin.user').component('userCallForwardingAlwaysQuickSet', {
    templateUrl:
      'user/components/callForwardingAlways/userCallForwardingAlwaysQuick.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' },
    require: { parent: '^^userQuickSet' }
  })

  function Controller(Alert, UserCallForwardingAlwaysService) {
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
        ctrl.settings = data
      })
    }

    function toggle() {
      if (!ctrl.settings.forwardToPhoneNumber) {
        Alert.notify.warning('Please Configure a Phone Number')
        ctrl.parent.editService = 'User Call Forwarding Always'
        ctrl.settings.isActive = !ctrl.settings.isActive
        return
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
