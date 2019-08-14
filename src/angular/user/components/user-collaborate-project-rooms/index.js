import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userCollaborateProjectRooms', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserCollaborateProjectRoomService',
  'UserCollaborateService',
  'UserCollaborateInstantRoomService'
]
function controller(
  Alert,
  UserCollaborateProjectRoomService,
  UserCollaborateService,
  UserCollaborateInstantRoomService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.edit = edit
  ctrl.regenerate = regenerate
  ctrl.options = UserCollaborateInstantRoomService.options

  ctrl.columns = [
    {
      key: 'roomId',
      label: 'Room ID'
    },
    {
      key: 'roomName',
      label: 'Room Name'
    }
  ]

  function onInit() {
    ctrl.loading = true
    loadProjectRooms()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadProjectRooms() {
    return UserCollaborateProjectRoomService.index(ctrl.userId).then(function(data) {
      ctrl.projectRooms = _.filter(data, { roomType: 'Project Room' })
    })
  }

  function loadProjectRoom(roomId) {
    return UserCollaborateProjectRoomService.show(ctrl.userId, roomId)
  }

  function add() {
    ctrl.editProjectRoom = { userId: ctrl.userId }
    Alert.modal.open('editUserCollaborateProjectRoom', function(close) {
      create(close)
    })
  }

  function edit(projectRoom) {
    Alert.spinner.open()
    loadProjectRoom(projectRoom.roomId)
      .then(function(data) {
        ctrl.editProjectRoom = data
        Alert.modal.open(
          'editUserCollaborateProjectRoom',
          function(close) {
            update(ctrl.editProjectRoom, close)
          },
          function(close) {
            Alert.confirm
              .open('Are you sure you want to delete this Project Room?')
              .then(function() {
                destroy(ctrl.editProjectRoom, close)
              })
          }
        )
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function update(settings, callback) {
    Alert.spinner.open()
    UserCollaborateProjectRoomService.update(
      ctrl.userId,
      ctrl.editProjectRoom.roomId,
      ctrl.editProjectRoom
    )
      .then(loadProjectRooms)
      .then(function() {
        Alert.notify.success('Project Room Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(criteria, callback) {
    Alert.spinner.open()
    UserCollaborateProjectRoomService.destroy(ctrl.userId, criteria.roomId)
      .then(loadProjectRooms)
      .then(function() {
        Alert.notify.danger('Project Room Removed')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function regenerate(roomId) {
    Alert.confirm.open('Are you sure you want to regenerate this Room ID?').then(function() {
      Alert.spinner.open()
      UserCollaborateService.regenerate(ctrl.userId, roomId)
        .then(loadProjectRooms)
        .then(function() {
          Alert.notify.success('Project RoomId modified')
          Alert.modal.closeAll()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    })
  }

  function create(callback) {
    Alert.spinner.open()
    UserCollaborateProjectRoomService.store(ctrl.userId, ctrl.editProjectRoom)
      .then(loadProjectRooms)
      .then(function() {
        Alert.notify.success('Project Room Created')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
