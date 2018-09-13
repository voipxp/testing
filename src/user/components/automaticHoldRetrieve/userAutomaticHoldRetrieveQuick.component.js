;(function() {
  angular.module('odin.user').component('userAutomaticHoldRetrieveQuickSet', {
    templateUrl:
      'user/components/callForwardingAlways/userAutomaticHoldRetrieveQuick.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserAutomaticHoldRetrieveService, Route) {
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
      return UserAutomaticHoldRetrieveService.show(ctrl.userId).then(function(
        data
      ) {
        console.log('settings', ctrl.settings)
        ctrl.settings = data
      })
    }

    function toggle() {
      if (!ctrl.settings.recallTimerSeconds) {
        Alert.notify.warning('Please Configure a recall timer seconds')
        return Route.open(
          'users',
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.userId,
          'automaticHoldRetrieve'
        )
      }
      ctrl.loading = true
      UserAutomaticHoldRetrieveService.update(ctrl.userId, ctrl.settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('User Automatic Hold Retrieve Updated')
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
