;(function() {
  angular.module('odin.user').component('userMusicOnHold', {
    templateUrl: 'user/components/musicOnHold/userMusicOnHold.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserMusicOnHoldService, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserMusicOnHoldService.options

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
      return Module.show('Music On Hold User').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSettings() {
      return UserMusicOnHoldService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserMusicOnHold', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserMusicOnHoldService.update(ctrl.userId, settings)
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
