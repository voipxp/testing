import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userMeetMeConferencingConferences', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'Alert',
  '$q',
  'UserMeetMeConferencingConferencesService',
  'GroupMeetMeConferencingBridgeService',
  'UserMeetMeConferencingDelegatesService',
  'Module'
]
function controller(
  Alert,
  $q,
  UserMeetMeConferencingConferencesService,
  GroupMeetMeConferencingBridgeService,
  UserMeetMeConferencingDelegatesService,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.add = add
  ctrl.conferenceOptions = UserMeetMeConferencingConferencesService.options
  ctrl.availableUsers = []
  ctrl.assignedUsers = []

  function onInit() {
    ctrl.loading = true
    return $q
      .all([
        loadMeetMeConferencingConferencesList(),
        loadMeetMeConferencesUserBridgesList(),
        loadModule()
      ])
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Meet-Me Conferencing').then(function(data) {
      ctrl.module = data
    })
  }

  function loadMeetMeConferencesUserBridgesList() {
    return UserMeetMeConferencingConferencesService.bridges(ctrl.userId).then(
      function(data) {
        ctrl.meetMeConferencingBridges = data
        return ctrl.meetMeConferencingBridges
      }
    )
  }

  function loadMeetMeConferencingConferencesList() {
    return UserMeetMeConferencingConferencesService.index(ctrl.userId).then(
      function(data) {
        ctrl.meetMeConferencingConferences = data
        return ctrl.meetMeConferencingConferences
      }
    )
  }

  function add() {
    ctrl.editConference = { userId: ctrl.userId }
    Alert.modal.open('addConference', function(close) {
      createConference(close)
    })
  }

  function createConference(callback) {
    Alert.spinner.open()
    UserMeetMeConferencingConferencesService.store(
      ctrl.userId,
      ctrl.editConference.bridgeId,
      ctrl.editConference
    )
      .then(loadMeetMeConferencingConferencesList)
      .then(function() {
        Alert.notify.success('Conference Created')
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

  function loadAvailableDelegates(bridgeId, conferenceId) {
    return UserMeetMeConferencingDelegatesService.users(
      ctrl.userId,
      bridgeId,
      conferenceId
    ).then(function(data) {
      // not self or someone already assigned
      ctrl.availableUsers = _.filter(data, function(user) {
        return (
          user.userId !== ctrl.userId &&
          !_.find(ctrl.assignedUsers, { userId: user.userId })
        )
      })
    })
  }

  function loadAssignedDelegates(bridgeId, conferenceId) {
    return UserMeetMeConferencingDelegatesService.index(
      ctrl.userId,
      bridgeId,
      conferenceId
    ).then(function(data) {
      ctrl.assignedUsers = data
    })
  }

  function edit(meetMe) {
    if (!ctrl.module.permissions.update) return
    var deleteAction
    if (ctrl.module.permissions.delete) {
      deleteAction = function(close) {
        Alert.confirm
          .open('Are you sure you want to delete this Conference?')
          .then(function() {
            destroy(ctrl.editConference, close)
          })
      }
    }
    Alert.spinner.open()
    getGroupConference(meetMe.bridgeId)
      .then(function(groupBridge) {
        ctrl.groupBridge = groupBridge
      })
      .then(function() {
        return loadAssignedDelegates(meetMe.bridgeId, meetMe.conferenceId)
      })
      .then(function() {
        return loadAvailableDelegates(meetMe.bridgeId, meetMe.conferenceId)
      })
      .then(function() {
        return getConference(meetMe.conferenceId, meetMe.bridgeId)
      })
      .then(function(data) {
        ctrl.editConference = data
        ctrl.editConference.conferenceId = meetMe.conferenceId
        ctrl.editConference.bridgeId = meetMe.bridgeId
        ctrl.editConference.bridgeName = meetMe.bridgeName
        Alert.modal.open(
          'editConference',
          function(close) {
            updateConference(ctrl.editConference, close)
          },
          deleteAction
        )
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function destroy(conference, callback) {
    Alert.spinner.open()
    UserMeetMeConferencingConferencesService.destroy(
      ctrl.userId,
      conference.conferenceId,
      conference.bridgeId
    )
      .then(loadMeetMeConferencingConferencesList)
      .then(function() {
        Alert.notify.danger('Meet Me Conference Removed')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function saveDelegates() {
    return UserMeetMeConferencingDelegatesService.update(
      ctrl.userId,
      ctrl.editConference.bridgeId,
      ctrl.editConference.conferenceId,
      {
        userId: ctrl.userId,
        bridgeId: ctrl.editConference.bridgeId,
        conferenceId: ctrl.editConference.conferenceId,
        users: ctrl.assignedUsers
      }
    )
  }

  function updateConference(conference, callback) {
    Alert.spinner.open()
    UserMeetMeConferencingConferencesService.update(
      ctrl.userId,
      ctrl.conferenceId,
      ctrl.groupBridge.serviceUserId,
      conference
    )
      .then(saveDelegates)
      .then(loadMeetMeConferencingConferencesList)
      .then(function() {
        Alert.notify.success('Conference Updated')
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

  function getGroupConference(serviceUserId) {
    return GroupMeetMeConferencingBridgeService.show(serviceUserId).then(
      function(data) {
        return data
      }
    )
  }

  function getConference(conferenceId, bridgeId) {
    return UserMeetMeConferencingConferencesService.show(
      ctrl.userId,
      conferenceId,
      bridgeId
    )
  }
}
