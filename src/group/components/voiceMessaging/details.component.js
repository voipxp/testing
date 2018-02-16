;(function() {
  angular.module('odin.group').component('groupVoiceMessagingDetails', {
    templateUrl: 'group/components/voiceMessaging/details.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '=', groupId: '=', module: '<' }
  })

  function Controller(Alert, GroupVoiceMessagingService) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.edit = edit
    ctrl.options = GroupVoiceMessagingService.options

    function activate() {
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
      return GroupVoiceMessagingService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.settings = data
        console.log('settings', data)
        return data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editGroupVoiceMessaging', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      GroupVoiceMessagingService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        settings
      )
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Voice Messaging Updated')
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
