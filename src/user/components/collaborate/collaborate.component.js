;(function() {
  angular.module('odin.user').component('userCollaborate', {
    templateUrl: 'user/components/collaborate/collaborate.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    $q,
    Alert,
    UserCollaborateService,
    UserCollaborateInstantRoomService,
    UserCollaborateProjectRoomService,
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.open = open
    ctrl.editModelInstantRoom = editModelInstantRoom
    ctrl.openMyRoom = openMyRoom
    ctrl.openProjectRoom = openProjectRoom
    ctrl.addProjectRoom = addProjectRoom
    ctrl.instantRoomOptions = UserCollaborateInstantRoomService.options

    function onInit() {
      ctrl.loading = true
      return $q
        .all([
          loadCollaborate(),
          loadBridge(),
          loadInstantRoom(),
          loadProjectRoomList()
        ])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }
    function loadProjectRoomList() {
      return UserCollaborateProjectRoomService.index(ctrl.userId).then(function(
        data
      ) {
        ctrl.projectRooms = data
      })
    }
    function loadInstantRoom() {
      return UserCollaborateInstantRoomService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.instantRoom = data
      })
    }

    function loadBridge() {
      return UserCollaborateService.bridge(ctrl.userId).then(function(data) {
        ctrl.bridge = data
      })
    }
    function loadProjectRoom(roomId) {
      return UserCollaborateProjectRoomService.show(ctrl.userId, roomId).then(
        function(data) {
          ctrl.projectRoom = data
        }
      )
    }
    function loadCollaborate() {
      return UserCollaborateService.show(ctrl.userId).then(function(data) {
        ctrl.myRoom = data
      })
    }

    function open(collaborate) {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'collaborate',
        collaborate.serviceUserId
      )
    }
    function openMyRoom() {
      ctrl.editMyRoom = angular.copy(ctrl.myRoom)
      loadCollaborate()
        .then(function() {
          ctrl.showOptional = false
          Alert.modal.open('editUserCollaborateMyRoom', function(close) {
            updateMyRoom(ctrl.editMyRoom, close)
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }
    function addProjectRoom() {
      ctrl.editProjectRoom = {}
      Alert.modal.open('editUserCollaborateProjectRoom', function(close) {
        createProjectRoom(close)
      })
    }
    function openProjectRoom(projectRoom) {
      loadProjectRoom(projectRoom.roomId)
        .then(function() {
          ctrl.editProjectRoom = angular.copy(ctrl.projectRoom)
          ctrl.editProjectRoom.roomId = projectRoom.roomId
          ctrl.editProjectRoom.roomType = projectRoom.roomType
          ctrl.editProjectRoom.roomName = projectRoom.name
          ctrl.showOptional = false
          Alert.modal.open(
            'editUserCollaborateProjectRoom',
            function(close) {
              updateProjectRoom(projectRoom, close)
            },
            function(close) {
              Alert.confirm
                .open('Are you sure you want to delete this Criteria?')
                .then(function() {
                  destroy(ctrl.editProjectRoom, close)
                })
            }
          )
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }

    function editModelInstantRoom() {
      ctrl.editInstantRoom = angular.copy(ctrl.instantRoom)
      loadInstantRoom()
        .then(function() {
          ctrl.showOptional = false
          Alert.modal.open('editUserCollaborateInstantRoom', function(close) {
            updateInstantRoom(ctrl.editInstantRoom, close)
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }
    function createProjectRoom(callback) {
      UserCollaborateProjectRoomService.store(ctrl.userId, ctrl.editProjectRoom)
        .then(loadProjectRoomList)
        .then(function() {
          Alert.notify.success('Project Room Created')
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
    function updateProjectRoom(settings, callback) {
      UserCollaborateProjectRoomService.update(
        ctrl.userId,
        ctrl.editProjectRoom.roomId,
        ctrl.editProjectRoom
      )
        .then(loadProjectRoomList)
        .then(function() {
          Alert.notify.success('Project Room Updated')
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
    function updateMyRoom(settings, callback) {
      Alert.spinner.open()
      UserCollaborateService.update(ctrl.userId, settings)
        .then(loadCollaborate)
        .then(function() {
          Alert.notify.success('Settings My Room Updated')
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

    function updateInstantRoom(settings, callback) {
      Alert.spinner.open()
      UserCollaborateInstantRoomService.update(ctrl.userId, settings)
        .then(loadInstantRoom)
        .then(function() {
          Alert.notify.success('Settings Instant Room Updated')
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
    function destroy(criteria, callback) {
      Alert.spinner.open()
      UserCollaborateProjectRoomService.destroy(ctrl.userId, criteria.roomId)
        .then(loadProjectRoomList)
        .then(function() {
          Alert.notify.danger('Project Room Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
