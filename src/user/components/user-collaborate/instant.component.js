;(function() {
  angular.module('odin.user').component('userCollaborateInstantRoom', {
    templateUrl: 'user/components/collaborate/instant.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserCollaborateInstantRoomService) {
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
      return UserCollaborateInstantRoomService.show(ctrl.userId).then(function(
        data
      ) {
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
})()
