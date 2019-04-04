import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroupCreate', {
  template,
  controller,
  bindings: {
    groupId: '<',
    serviceProviderId: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'HashService',
  '$scope',
  'EventEmitter',
  'GroupHuntGroupService',
  'GroupHuntGroupUserService'
]
function controller(
  Alert,
  HashService,
  $scope,
  EventEmitter,
  GroupHuntGroupService,
  GroupHuntGroupUserService
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.options = GroupHuntGroupService.options
  ctrl.onSelectPhone = onSelectPhone
  ctrl.onSelectUserId = onSelectUserId

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function open() {
    loadAvailableAgents()
    ctrl.huntGroup = {
      useSystemHuntGroupCLIDSetting: true,
      includeHuntGroupNameInCLID: true,
      allowCallWaitingForAgents: false,
      huntAfterNoAnswer: false,
      noAnswerNumberOfRings: 5,
      forwardAfterTimeout: false,
      forwardTimeoutSeconds: 10,
      policy: 'Regular',
      agents: []
    }
    Alert.modal.open(ctrl.modalId, function(close) {
      create(ctrl.huntGroup, close)
    })
  }

  function loadAvailableAgents() {
    ctrl.loadingAgents = true
    return GroupHuntGroupUserService.index(
      'dummy',
      ctrl.serviceProviderId,
      ctrl.groupId
    )
      .then(function(data) {
        ctrl.availableAgents = data
      })
      .catch(Alert.danger)
      .finally(function() {
        ctrl.loadingAgents = false
      })
  }

  function create(huntGroup, callback) {
    Alert.spinner.open()
    huntGroup.serviceProviderId = ctrl.serviceProviderId
    huntGroup.groupId = ctrl.groupId
    GroupHuntGroupService.store(huntGroup)
      .then(function() {
        Alert.notify.success('Hunt Group Created')
        callback()
        sendUpdate(huntGroup)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function onSelectPhone(event) {
    _.set(
      ctrl.huntGroup,
      'serviceInstanceProfile.phoneNumber',
      event.phoneNumber
    )
  }

  function onSelectUserId(event) {
    ctrl.huntGroup.serviceUserId = event.userId
  }

  function sendUpdate(huntGroup) {
    return ctrl.onUpdate(EventEmitter({ huntGroup: huntGroup }))
  }

  $scope.$on('groupHuntGroupCreate:load', open)
}
