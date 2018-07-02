;(function() {
  angular.module('odin.user').component('userDirectedCallPickupWithBargeIn', {
    templateUrl:
      'user/components/directedCallPickupWithBargeIn/userDirectedCallPickupWithBargeIn.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(
    Alert,
    UserDirectedCallPickupWithBargeInService,
    $q,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      $q.all([loadSettings(), loadModule()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Directed Call Pickup with Barge-in').then(function(
        data
      ) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserDirectedCallPickupWithBargeInService.show(ctrl.userId).then(
        function(data) {
          ctrl.settings = data
        }
      )
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserDirectedCallPickupWithBargeIn', function(
        close
      ) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserDirectedCallPickupWithBargeInService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) {
            callback()
          }
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
