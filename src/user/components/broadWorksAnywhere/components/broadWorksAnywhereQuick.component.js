;(function() {
  angular.module('odin.user').component('userBroadworksAnywhereQuickSet', {
    templateUrl:
      'user/components/broadWorksAnywhere/components/broadWorksAnywhereQuick.component.html',
    controller: Controller,
    bindings: { userId: '<', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(
    Alert,
    UserBroadWorksAnywhereService,
    PhoneNumberBroadWorksAnywhereService,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.toggle = toggle
    ctrl.loadingNumber = {}
    ctrl.open = open

    function onInit() {
      ctrl.loading = true
      loadSettings()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserBroadWorksAnywhereService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.settings = data
      })
    }

    function open() {
      Route.open(
        'users',
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.userId,
        'broadWorksAnywhere'
      )
    }

    function toggle(number) {
      ctrl.loadingNumber[number.phoneNumber] = true
      PhoneNumberBroadWorksAnywhereService.update(
        ctrl.userId,
        number.phoneNumber,
        number
      )
        .then(loadSettings)
        .then(function() {
          Alert.notify.success(number.phoneNumber + ' Updated')
        })
        .catch(function(error) {
          number.isActive = !number.isActive
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loadingNumber[number.phoneNumber] = false
        })
    }
  }
})()
