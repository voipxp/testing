;(function() {
  angular.module('odin.group').component('groupHuntGroupSettings', {
    templateUrl: 'group/components/huntGroups/settings.component.html',
    controller: Controller,
    require: { parent: '^groupHuntGroup' }
  })

  function Controller(
    GroupHuntGroupService,
    Alert,
    ACL,
    Module,
    GroupPolicyService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.hasVersion20 = ACL.hasVersion('20')
    ctrl.edit = edit
    ctrl.canUpdate = Module.update('Hunt Group')
    ctrl.canDelete = Module.delete('Hunt Group')
    function onInit() {
      ctrl.loading = true
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
      ctrl.editHuntGroup = angular.copy(ctrl.parent.huntGroup)
      var deleteAction
      if (ctrl.parent.module.permissions.delete) {
        deleteAction = function(close) {
          Alert.confirm
            .open('Are you sure you want to remove this Hunt Group?')
            .then(function() {
              ctrl.parent.destroy(close)
            })
        }
      }
      Alert.modal.open(
        'groupHuntGroupEditSettingsModal',
        function(close) {
          ctrl.parent.update(ctrl.editHuntGroup, close)
        },
        deleteAction
      )
    }
  }
})()
