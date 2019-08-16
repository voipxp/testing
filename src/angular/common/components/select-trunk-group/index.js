import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectTrunkGroup', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', onUpdate: '&' }
})

controller.$inject = ['Alert', 'GroupTrunkGroupService', 'HashService', 'EventEmitter', '$scope']
function controller(Alert, GroupTrunkGroupService, HashService, EventEmitter, $scope) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.select = select

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function onChanges(changes) {
    if (changes.serviceProviderId) {
      ctrl.serviceProviderId = changes.serviceProviderId.currentValue
    }
    if (changes.groupId) {
      ctrl.groupId = changes.groupId.currentValue
    }
  }

  function loadTrunks() {
    return GroupTrunkGroupService.index(ctrl.serviceProviderId, ctrl.groupId).then(function(data) {
      ctrl.trunks = data
    })
  }

  function load() {
    Alert.spinner.open()
    return loadTrunks()
      .then(function() {
        Alert.modal.open(ctrl.modalId)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function select(trunk) {
    ctrl.search = ''
    Alert.modal.close(ctrl.modalId)
    ctrl.onUpdate(EventEmitter({ trunk: trunk }))
  }

  $scope.$on('selectTrunkGroup:load', load)
}
