import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupTrunkGroupProfile', {
  template,
  controller,
  require: { parent: '^groupTrunkGroup' }
})

controller.$inject = [
  'Alert',
  'GroupTrunkGroupService',
  'Module',
  'GroupPolicyService',
  'ServiceProviderSipAuthPasswordRulesService',
  'SystemSipAuthPasswordRulesService',
  'ACL'
]
function controller(Alert, GroupTrunkGroupService, Module, GroupPolicyService, ,ServiceProviderSipAuthPasswordRulesService, SystemSipAuthPasswordRulesService, ACL) {
 
  var ctrl = this
  ctrl.options = GroupTrunkGroupService.options
  ctrl.edit = edit
  ctrl.$onInit = onInit
  ctrl.canUpdate = Module.update('Trunk Group - Authentication')
  ctrl.isDepartmentAdmin = ACL.is('Group Department')

  function onInit() {
    loadPasswordRuleLength()
    return Module.show('Trunk Group - Authentication').then(function(data) {
      ctrl.authentication = data.permissions
      GroupPolicyService.load().then(function() {
        ctrl.canUpdate = GroupPolicyService.trunkGroupUpdate() && ctrl.canUpdate
      })
    })
  }

  function loadPasswordRuleLength() {
    ServiceProviderSipAuthPasswordRulesService.show(ctrl.parent.serviceProviderId)
    .then(function(rules) {
      if (rules.useServiceProviderSettings === true) {
        ctrl.passMinLen = rules.minLength;
      } else {
          loadSystemSipAuthPasswordRules();
      }
      ctrl.passMinLen =   rules.minLength
    })
  }
  function loadSystemSipAuthPasswordRules() {
    SystemSipAuthPasswordRulesService.show().then(function (rules) {
    ctrl.passMinLen = rules.minLength;
  });
  
  }
  function edit() {
    var onDelete
    if (ctrl.parent.module.permissions.delete) {
      onDelete = ctrl.parent.destroy
    }
    ctrl.editTrunk = angular.copy(ctrl.parent.trunk)
    ctrl.editTrunk.newName = ctrl.parent.trunkName
    Alert.modal.open(
      'editGroupTrunkGroupProfile',
      function onSave(close) {
        update(ctrl.editTrunk, close)
      },
      onDelete
    )
  }

  function update(trunk, callback) {
    ctrl.parent.update(trunk, callback)
  }
}
