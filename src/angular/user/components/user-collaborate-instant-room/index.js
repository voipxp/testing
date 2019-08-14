import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userCollaborateInstantRoom', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserCollaborateInstantRoomService']
function controller(Alert, UserCollaborateInstantRoomService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserCollaborateInstantRoomService.options

  function onInit() {
    ctrl.loading = true
    loadInstantRoom()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadInstantRoom() {
    return UserCollaborateInstantRoomService.show(ctrl.userId).then(function(data) {
      ctrl.instantRoom = data
    })
  }

  function edit() {
    ctrl.editInstantRoom = angular.copy(ctrl.instantRoom)
    Alert.modal.open('editUserCollaborateInstantRoom', function(close) {
      update(ctrl.editInstantRoom, close)
    })
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserCollaborateInstantRoomService.update(ctrl.userId, settings)
      .then(loadInstantRoom)
      .then(function() {
        Alert.notify.success('Instant Room is Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
