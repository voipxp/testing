;(function() {
  angular.module('odin.user').component('userRemoteOfficeQuickSet', {
    templateUrl:
      'user/components/remoteOffice/userRemoteOfficeQuick.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, UserRemoteOfficeService, Route) {
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
      return UserRemoteOfficeService.show(ctrl.userId).then(function(data) {
        console.log('settings', data)
        ctrl.settings = data
      })
    }

    function toggle() {
      if (!ctrl.settings.remoteOfficePhoneNumber) {
        Alert.notify.warning('Please Configure a Phone Number')
        Route.open(
          'users',
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.userId,
          'remoteOffice'
        )()
        return
      }
      ctrl.loading = true
      UserRemoteOfficeService.update(ctrl.userId, ctrl.settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Remote Office Updated')
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
