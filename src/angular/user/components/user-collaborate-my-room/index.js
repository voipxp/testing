import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCollaborateMyRoom', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserCollaborateService', 'UserCollaborateInstantRoomService']
function controller(Alert, UserCollaborateService, UserCollaborateInstantRoomService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.regenerate = regenerate
  ctrl.options = UserCollaborateInstantRoomService.options

  function onInit() {
    ctrl.loading = true
    return loadCollaborate()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadCollaborate() {
    return UserCollaborateService.show(ctrl.userId).then(function(data) {
      ctrl.myRoom = data
    })
  }

  function edit() {
    ctrl.editMyRoom = angular.copy(ctrl.myRoom)
    Alert.modal.open('editUserCollaborateMyRoom', function(close) {
      update(ctrl.editMyRoom, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserCollaborateService.update(ctrl.userId, settings)
      .then(loadCollaborate)
      .then(function() {
        Alert.notify.success('My Room Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function regenerate() {
    Alert.confirm.open('Are you sure you want to regenerate your room id?').then(function() {
      Alert.spinner.open()
      UserCollaborateService.regenerate(ctrl.userId, ctrl.myRoom.roomId)
        .then(loadCollaborate)
        .then(function() {
          Alert.notify.success('Room ID Updated')
          Alert.modal.closeAll()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    })
  }
}
