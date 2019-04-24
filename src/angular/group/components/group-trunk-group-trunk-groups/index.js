import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupTrunkGroups', {
  template,
  controller,
  require: { parent: '^groupTrunkGroups' },
  bindings: { serviceProviderId: '=', groupId: '=', module: '<' }
})

controller.$inject = [
  'Alert',
  'GroupTrunkGroupService',
  'GroupPolicyService',
  '$q'
]
function controller(Alert, GroupTrunkGroupService, GroupPolicyService, $q) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.open = ctrl.parent.open
    ctrl.add = ctrl.parent.add
    ctrl.loading = true
    return $q
      .all([GroupPolicyService.load(), loadTrunks()])
      .then(function() {
        ctrl.canCreate = GroupPolicyService.trunkGroupCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  // function activate() {
  //   ctrl.open = ctrl.parent.open
  //   ctrl.add = ctrl.parent.add
  //   ctrl.loading = true
  //   loadTrunks()
  //     .catch(function(error) {
  //       Alert.notify.danger(error)
  //     })
  //     .finally(function() {
  //       ctrl.loading = false
  //     })
  // }

  function loadTrunks() {
    return GroupTrunkGroupService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.trunks = data
      return data
    })
  }
}
