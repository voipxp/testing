;(function() {
  angular.module('odin.common').component('userVoiceMessagingAdvanced', {
    templateUrl:
      'common/components/userVoiceMessagingAdvanced/userVoiceMessagingAdvanced.component.html',
    controller: Controller,
    bindings: { userId: '=', readOnly: '<' }
  })

  function Controller(Alert, UserVoiceMessagingAdvancedService) {
    var ctrl = this

    ctrl.options = UserVoiceMessagingAdvancedService.options
    ctrl.messaging = {}
    ctrl.edit = edit
    ctrl.update = update
    ctrl.$onInit = activate

    function activate() {
      ctrl.loading = true
      return loadVoiceMessaging()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadVoiceMessaging() {
      return UserVoiceMessagingAdvancedService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.messaging = data
        console.log('messaging', data)
        return data
      })
    }

    function edit() {
      ctrl.editMessaging = angular.copy(ctrl.messaging)
      Alert.modal.open('editUserVoiceMessagingAdvanced', function(close) {
        return update(close)
      })
    }

    function update(callback) {
      console.log('updating', ctrl.editMessaging)
      ctrl.editMessaging.userId = ctrl.userId
      Alert.spinner.open()
      return UserVoiceMessagingAdvancedService.update(
        ctrl.userId,
        ctrl.editMessaging
      )
        .then(loadVoiceMessaging)
        .then(function() {
          Alert.notify.success('Advanced Voice Messaging Saved')
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
