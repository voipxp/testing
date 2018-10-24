;(function() {
  angular.module('odin.group').component('meetMeBridge', {
    templateUrl: 'group/components/meetMe/bridge/meetMeBridge.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    Route,
    $q,
    GroupMeetMeConferencingBridgeService,
    Session
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.onUpdateProfile = onUpdateProfile
    ctrl.update = update
    ctrl.remove = remove
    ctrl.bridge = {}
    ctrl.open = open

    ctrl.$onInit = onInit

    ctrl.loginType = Session.data('loginType')

    function onUpdateProfile(event) {
      var bridge = angular.copy(ctrl.bridge)
      bridge.serviceInstanceProfile = event.profile
      update(bridge, event.callback)
    }

    function onInit() {
      ctrl.loading = true
      return loadBridge()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadBridge() {
      return GroupMeetMeConferencingBridgeService.show(ctrl.serviceUserId).then(
        function(data) {
          if (data.extension) {
            data.extension = String(data.extension)
          }
          if (data.phoneNumber) {
            data.phoneNumber = String(data.phoneNumber)
          }
          ctrl.bridge = data
          return data
        }
      )
    }

    function update(bridge, callback) {
      Alert.spinner.open()
      GroupMeetMeConferencingBridgeService.update(ctrl.serviceUserId, bridge)
        .then(function() {
          return loadBridge().then(function() {
            Alert.notify.success('Bridge Updated')
            if (_.isFunction(callback)) {
              callback()
            }
          })
        })
        .catch(function(error) {
          Alert.notify.success(error.data)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function remove(callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Bridge?')
        .then(function() {
          Alert.spinner.open()
          GroupMeetMeConferencingBridgeService.destroy(ctrl.serviceUserId)
            .then(function() {
              Alert.notify.success('Bridge Removed')
              if (_.isFunction(callback)) {
                callback()
              }
              open(ctrl.groupId)
            })
            .catch(function(error) {
              Alert.notify.danger(error)
            })
            .finally(function() {
              Alert.spinner.close()
            })
        })
    }

    function open(groupId) {
      Route.open('groups', ctrl.serviceProviderId, groupId, 'meetMe')
    }
  }
})()
