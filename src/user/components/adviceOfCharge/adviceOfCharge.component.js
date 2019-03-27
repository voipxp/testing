;(function() {
  angular.module('odin.user').component('userAdviceOfCharge', {
    templateUrl: 'user/components/adviceOfCharge/adviceOfCharge.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserAdviceOfChargeService, Module, $q) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserAdviceOfChargeService.options

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
      return Module.show('Advice Of Charge').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserAdviceOfChargeService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserAdviceOfCharge', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserAdviceOfChargeService.update(settings)
        .then(function(data) {
          ctrl.settings = data
        })
        // .then(loadSettings)
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
