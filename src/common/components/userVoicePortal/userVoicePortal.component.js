;(function() {
  angular.module('odin.common').component('userVoicePortal', {
    templateUrl:
      'common/components/userVoicePortal/userVoicePortal.component.html',
    controller: Controller,
    bindings: { userId: '=', readOnly: '<' }
  })

  function Controller(Alert, UserVoiceMessagingVoicePortalService, $scope) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.$onInit = activate
    ctrl.options = UserVoiceMessagingVoicePortalService.options
    ctrl.audioFileSelected = audioFileSelected

    function activate() {
      ctrl.loading = true
      loadPortal()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPortal() {
      return UserVoiceMessagingVoicePortalService.show(ctrl.userId).then(
        function(data) {
          ctrl.portal = data
          return data
        }
      )
    }

    function update(portal, callback) {
      Alert.spinner.open()
      UserVoiceMessagingVoicePortalService.update(ctrl.userId, portal)
        .then(loadPortal)
        .then(function() {
          ctrl.editPortal = {}
          Alert.notify.success('Voice Portal Updated')
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

    function edit() {
      if ($scope.editUserVoicePortalForm) {
        $scope.editUserVoicePortalForm.$setPristine()
      }
      ctrl.editPortal = angular.copy(ctrl.portal)
      Alert.modal.open('editUserVoicePortal', function(close) {
        update(ctrl.editPortal, close)
      })
    }

    function audioFileSelected(file) {
      if (!file) return
      switch (file.mimetype) {
        case 'audio/wav':
          ctrl.editPortal.audioFile.mediaType = 'WAV'
          break
        case 'video/3gpp':
          ctrl.editPortal.audioFile.mediaType = '3GP'
          break
        case 'video/x-ms-wma':
          ctrl.editPortal.audioFile.mediaType = 'WMA'
          break
        case 'video/quicktime':
          ctrl.editPortal.audioFile.mediaType = 'MOV'
          break
        default:
          Alert.notify.danger('Media Type Not Supported: (WAV, 3GP, WMA, MOV)')
          return
      }
      ctrl.editPortal.audioFile.description = file.name
      ctrl.editPortal.audioFile.content = file.content
    }
  }
})()
