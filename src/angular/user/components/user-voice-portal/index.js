import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userVoicePortal', {
  template,
  controller,
  bindings: { userId: '=', readOnly: '<' }
})

controller.$inject = ['Alert', 'UserVoiceMessagingVoicePortalService', '$scope']
function controller(Alert, UserVoiceMessagingVoicePortalService, $scope) {
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
    return UserVoiceMessagingVoicePortalService.show(ctrl.userId).then(function(
      data
    ) {
      ctrl.portal = data
      return data
    })
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
    ctrl.editPortal.audioFile.mediaType = 'WAV'
    ctrl.editPortal.audioFile.description = file.name
    ctrl.editPortal.audioFile.content = file.content
  }
}
