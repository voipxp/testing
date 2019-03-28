import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('selectGroup', {
  template,
  controller,
  bindings: { onUpdate: '&', serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupService',
  'EventEmitter',
  'HashService',
  '$scope'
]
function controller(Alert, GroupService, EventEmitter, HashService, $scope) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function open() {
    ctrl.loading = true
    Alert.modal.open(ctrl.modalId)
    loadGroups()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroups() {
    return GroupService.index(ctrl.serviceProviderId).then(function(data) {
      ctrl.groups = data
    })
  }

  function select(group) {
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ groupId: group.groupId }))
  }

  $scope.$on('selectGroup:load', open)
}
