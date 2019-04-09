import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('selectAutoAttendant', {
  template,
  controller,
  bindings: { onUpdate: '&', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupAutoAttendantService',
  'EventEmitter',
  'HashService',
  '$scope',
  'Module'
]
function controller(
  Alert,
  GroupAutoAttendantService,
  EventEmitter,
  HashService,
  $scope,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    Module.show('Auto Attendant').then(function(module) {
      ctrl.module = module
    })
    ctrl.modalId = HashService.guid()
  }

  function open() {
    ctrl.loading = true
    Alert.modal.open(ctrl.modalId)
    loadAutoAttendants()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadAutoAttendants() {
    return GroupAutoAttendantService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.autoAttendants = data
    })
  }

  function select(autoAttendant) {
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ serviceUserId: autoAttendant.serviceUserId }))
  }

  $scope.$on('selectAutoAttendant:load', open)
}
