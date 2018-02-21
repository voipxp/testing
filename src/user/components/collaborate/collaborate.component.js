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
    Route
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.open = open
    ctrl.add = add
    ctrl.editModelInstantRoom = editModelInstantRoom
    ctrl.openMyRoom = openMyRoom

    ctrl.onCreate = onCreate
    ctrl.instantRoomOptions = UserCollaborateInstantRoomService.options

    function onInit() {
      ctrl.loading = true
      console.log('ctrl.instantRoomOptions', ctrl.instantRoomOptions)
      return $q
        .all([loadCollaborate(), loadBridge(), loadInstantRoom()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }
    function loadInstantRoom() {
      return UserCollaborateInstantRoomService.show(ctrl.userId).then(function(
        data
      ) {
        ctrl.instantRoom = data
        console.log('instant room', data)
      })
    }

    function loadBridge() {
      return UserCollaborateService.bridge(ctrl.userId).then(function(data) {
        ctrl.bridge = data
        console.log('bridge', data)
      })
    }
    function loadCollaborate() {
      return UserCollaborateService.show(ctrl.userId).then(function(data) {
        ctrl.myRoom = data
        console.log('myRoom', data)
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

    function add() {}

    function onCreate() {}
  }
})()
