import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupCollaborate', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupCollaborateService', 'Route', '$q', 'Module']
function controller(Alert, GroupCollaborateService, Route, $q, Module) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.onClick = onClick
  ctrl.onUserClick = onUserClick

  ctrl.onSelectUserId = onSelectUserId
  ctrl.onSelectPhone = onSelectPhone

  ctrl.columns = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'participants',
      label: 'Participants'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'extension',
      label: 'Extension'
    },
    {
      key: 'department',
      label: 'Department'
    }
  ]

  ctrl.columnsDetails = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'participants',
      label: 'Participants'
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number'
    },
    {
      key: 'extension',
      label: 'Extension'
    },
    {
      key: 'userId',
      label: 'User Id'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'myRoom.roomId',
      label: 'My Room Id'
    }
  ]

  function onInit() {
    loadModule()
    ctrl.loading = true
    return $q
      .all([loadBridges(), loadDetails()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
    return Module.show('Collaborate - Audio').then(function(data) {
      ctrl.module = data
    })
  }

  function loadBridges() {
    return GroupCollaborateService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.bridges = data
    })
  }

  function loadDetails() {
    return GroupCollaborateService.details(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.details = data
    })
  }

  function onClick(bridge) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'group-services',
      'collaborate',
      'bridge'
    ).search({ serviceUserId: bridge.serviceUserId })
  }

  function open(user) {
    Route.open('users', ctrl.serviceProviderId, ctrl.groupId, user.userId)
  }
  function onUserClick(event) {
    open(event)
  }
  function add() {
    ctrl.addBridge = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      supportOutdial: false
    }
    Alert.modal.open('addGroupCollaborate', function(close) {
      create(ctrl.addBridge, close)
    })
  }

  function onSelectUserId(event) {
    ctrl.addBridge.serviceUserId = event.userId
  }

  function onSelectPhone(event) {
    _.set(
      ctrl.addBridge,
      'serviceInstanceProfile.phoneNumber',
      event.phoneNumber
    )
  }

  function create(bridge, callback) {
    Alert.spinner.open()
    GroupCollaborateService.store(bridge.serviceUserId, bridge)
      .then(function() {
        Alert.notify.success('Bridge Created')
        callback()
        onClick(bridge)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
