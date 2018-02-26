;(function() {
  angular.module('odin.user').component('userMeetMeConferenceingConferences', {
    templateUrl:
      'user/components/meetMe/meetMeConferencingConferences.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    $q,
    UserMeetMeConferencingConferencesService,
    GroupMeetMeConferencingBridgeService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.edit = edit
    ctrl.add = add
    ctrl.conferenceOptions = UserMeetMeConferencingConferencesService.options

    function onInit() {
      ctrl.loading = true
      return $q
        .all([
          loadMeetMeConferencingConferencesList(),
          loadMeetMeConferencesUserBridgesList()
        ])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadMeetMeConferencesUserBridgesList() {
      return UserMeetMeConferencingConferencesService.bridges(ctrl.userId).then(
        function(data) {
          ctrl.meetMeConferencingBridges = data
          console.log(
            'ctrl.meetMeConferencingBridges',
            ctrl.meetMeConferencingBridges
          )
          return ctrl.meetMeConferencingBridges
        }
      )
    }
    function loadMeetMeConferencingConferencesList() {
      return UserMeetMeConferencingConferencesService.index(ctrl.userId).then(
        function(data) {
          ctrl.meetMeConferencingConferences = data
          // console.log(
          //   'ctrl.meetMeConferencingConferences',
          //   ctrl.meetMeConferencingConferences
          // )
          return ctrl.meetMeConferencingConferences
        }
      )
    }
    function add() {
      ctrl.editConference = {}
      Alert.modal.open('addConference', function(close) {
        createConference(close)
      })
    }
    function createConference(callback) {
      console.log('ctrl.editConference', ctrl.editConference)
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

    function edit(meetMe) {
      // console.log('edit.meeteMe', meetMe)
      getGroupConference(meetMe.bridgeId)
        .then(function(groupBridge) {
          // console.log('edit.groupBridge', groupBridge)
          ctrl.groupBridge = groupBridge
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
      getConference(meetMe.conferenceId, meetMe.bridgeId)
        .then(function(data) {
          ctrl.editConference = data
          ctrl.editConference.conferenceId = meetMe.conferenceId
          ctrl.editConference.bridgeId = meetMe.bridgeId
          ctrl.editConference.bridgeName = meetMe.bridgeName
          Alert.modal.open(
            'editConference',
            function(close) {
              // console.log('ctrl.editConference', ctrl.editConference)
              updateConference(ctrl.editConference, close)
            },
            function(close) {
              Alert.confirm
                .open('Are you sure you want to delete this Criteria?')
                .then(function() {
                  destroy(ctrl.editConference, close)
                })
            }
          )
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
    }
    function destroy(criteria, callback) {
      // console.log('criteria', criteria)
      // console.log('ctrl.editConference', ctrl.editConference)
      Alert.spinner.open()
      UserMeetMeConferencingConferencesService.destroy(
        ctrl.userId,
        ctrl.editConference.conferenceId,
        ctrl.editConference.bridgeId
      )
        .then(loadMeetMeConferencingConferencesList)
        .then(function() {
          Alert.notify.danger('Meet Me Conference Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function updateConference(settings, callback) {
      // console.log('updateConference.settings', settings)
      UserMeetMeConferencingConferencesService.update(
        ctrl.userId,
        ctrl.conferenceId,
        ctrl.groupBridge.serviceUserId,
        ctrl.editConference
      )
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
      ).then(function(data) {
        return data
      })
    }
  }
})()
