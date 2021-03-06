import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupMeetMeBridge', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'Route',
  'GroupMeetMeConferencingBridgeService',
  'Session',
  '$location',
  'ACL'
]
function controller(
  Alert,
  Route,
  GroupMeetMeConferencingBridgeService,
  Session,
  $location,
  ACL
) {
  var ctrl = this
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
    ctrl.serviceUserId = $location.search().serviceUserId
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
    if(ACL.is('Group Department')) {
      Route.open('department', ctrl.serviceProviderId, groupId, 'meetMe')
    }else if(ACL.is('Group') || ACL.is('Service Provider') || ACL.is('System') ) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'group-services',
        'meetMeConferencing'
      )
    } else Route.open('groups', ctrl.serviceProviderId, groupId, 'meetMe')
}
}
