;(function() {
  angular.module('odin.group').component('groupCloneServices', {
    templateUrl: 'group/components/services/clone.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', onUpdate: '&' }
  })

  function Controller(EventEmitter, CloneGroupService, $scope, Alert, ACL) {
    var ctrl = this
    ctrl.selectServiceProvider = selectServiceProvider
    ctrl.selectGroup = selectGroup
    ctrl.onSelectServiceProvider = onSelectServiceProvider
    ctrl.onSelectGroup = onSelectGroup

    function selectServiceProvider() {
      $scope.$broadcast('selectServiceProvider:load')
    }

    function selectGroup() {
      if (!ctrl.fromServiceProviderId) return selectServiceProvider()
      $scope.$broadcast('selectGroup:load')
    }

    function onSelectServiceProvider(event) {
      if (event.serviceProviderId !== ctrl.fromServiceProviderId) {
        ctrl.fromGroupId = null
      }
      ctrl.fromServiceProviderId = event.serviceProviderId
    }

    function onSelectGroup(event) {
      ctrl.fromGroupId = event.groupId
    }

    function load() {
      ctrl.isProvisioning = ACL.has('Provisioning')
      if (!ctrl.isProvisioning) {
        ctrl.fromServiceProviderId = ctrl.serviceProviderId
      } else {
        ctrl.fromServiceProviderId = null
      }
      ctrl.fromGroupId = null
      var group = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId
      }
      ctrl.options = {}
      Alert.modal.open('cloneGroupServicesModal', function(close) {
        create(group, ctrl.options, close)
      })
    }

    function create(group, options, callback) {
      Alert.spinner.open()
      CloneGroupService.services(ctrl.fromServiceProviderId, ctrl.fromGroupId, {
        data: group,
        options: options
      })
        .then(function() {
          Alert.notify.success('Group Services Cloned')
          callback()
          sendUpdate(group)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function sendUpdate(group) {
      ctrl.onUpdate(EventEmitter({ group: group }))
    }

    $scope.$on('groupCloneServices:load', load)
  }
})()
