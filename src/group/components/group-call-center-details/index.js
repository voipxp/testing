import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterDetails', {
  template,
  controller,
  require: { parent: '^groupCallCenter' }
})

controller.$inject = [
  'Alert',
  'GroupCallCenterService',
  'Module',
  'GroupPolicyService',
  '$q'
]
function controller(
  Alert,
  GroupCallCenterService,
  Module,
  GroupPolicyService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.hasPermission = hasPermission
  ctrl.options = GroupCallCenterService.options
  ctrl.canUpdate = Module.update('Call Center')
  ctrl.canDelete = Module.delete('Call Center')

  function onInit() {
    return $q
      .all([GroupPolicyService.load()])
      .then(function() {
        ctrl.canUpdate =
          GroupPolicyService.enhancedServiceCreate() && ctrl.canUpdate
        ctrl.canDelete =
          GroupPolicyService.enhancedServiceCreate() && ctrl.canDelete
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }
  function edit() {
    ctrl.editCenter = angular.copy(ctrl.parent.center)
    ctrl.editCenter.newEnterpriseTrunkName = ctrl.parent.trunkName
    var onDelete
    if (ctrl.canDelete) {
      onDelete = function(close) {
        Alert.confirm
          .open('Are you sure you want to remove this Call Center?')
          .then(function() {
            ctrl.parent.destroy(close)
          })
      }
    }
    Alert.modal.open(
      'editGroupCallCenterDetails',
      function onSave(close) {
        ctrl.parent.update(ctrl.editCenter, close)
      },
      onDelete
    )
  }

  function hasPermission(attribute) {
    return GroupCallCenterService.hasPermission(ctrl.parent.center, attribute)
  }
}
