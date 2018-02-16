;(function() {
  angular.module('odin.user').component('userHotelingHost', {
    templateUrl: 'user/components/hotelingHost/userHotelingHost.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(Alert, UserHotelingHostService, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    ctrl.options = UserHotelingHostService.options

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
      return UserHotelingHostService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
      })
    }

    function edit() {
      console.log('ctrl.settings:', ctrl.settings)
      ctrl.editSettings = angular.copy(ctrl.settings)
      console.log('ctrl.editSettings:', ctrl.editSettings)
      Alert.modal.open('editUserHotelingHost', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      console.log('UPDATE', settings)
      console.log('ctrl.userId', ctrl.userId)
      Alert.spinner.open()
      UserHotelingHostService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) callback()
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
