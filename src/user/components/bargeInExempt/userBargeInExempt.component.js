;(function() {
  angular.module('odin.user').component('userBargeInExempt', {
    templateUrl:
      'user/components/bargeInExempt/userBargeInExempt.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, UserBargeInExemptService, $routeParams) {
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
      return UserBargeInExemptService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserBargeInExempt', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserBargeInExemptService.update(ctrl.userId, settings)
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
