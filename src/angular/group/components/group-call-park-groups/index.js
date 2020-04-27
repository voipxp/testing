import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallParkGroups', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupCallParkGroupService', 'Route']
function controller(Alert, GroupCallParkGroupService, Route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.options = GroupCallParkGroupService.options

  function onInit() {
    ctrl.loading = true
    loadGroups()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroups() {
    return GroupCallParkGroupService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.groups = data
    })
  }

  function add() {
    ctrl.editGroup = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    Alert.modal.open('groupCallParkGroupCreateModal', function(close) {
      create(ctrl.editGroup, close)
    })
  }

  function create(group, callback) {
    Alert.spinner.open()
    GroupCallParkGroupService.store(group)
      .then(function() {
        callback()
        Alert.notify.success('Group Created')
        open(group)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function open(group) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'callPark',
      'group'
    ).search({ name: group.name })
  }
}
