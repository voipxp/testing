;(function() {
  angular.module('odin.serviceProvider').component('groupClone', {
    templateUrl: 'serviceProvider/components/groups/clone.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', onUpdate: '&' }
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
      console.log('onSelectServiceProvider', event)
      if (event.serviceProviderId !== ctrl.fromServiceProviderId) {
        ctrl.fromGroupId = null
      }
      ctrl.fromServiceProviderId = event.serviceProviderId
      selectGroup()
    }

    function onSelectGroup(event) {
      console.log('onSelectGroup', event)
      ctrl.fromGroupId = event.groupId
    }

    function load() {
      ctrl.isProvisioning = ACL.has('Provisioning')
      if (!ctrl.isProvisioning) {
        ctrl.fromServiceProviderId = ctrl.serviceProviderId
      }
      ctrl.groupId = null
      ctrl.group = {}
      ctrl.options = {
        featureAccessCode: true,
        callProcessingPolicy: true,
        networkClassOfService: true,
        extensionLength: true,
        services: true,
        policy: true,
        schedule: true,
        outgoingCallingPlan: true
      }
      Alert.modal.open('cloneGroupModal', function(close) {
        ctrl.group.serviceProviderId = ctrl.serviceProviderId
        create(ctrl.group, ctrl.options, close)
      })
    }

    function create(group, options, callback) {
      Alert.spinner.open()
      CloneGroupService.all(ctrl.fromServiceProviderId, ctrl.fromGroupId, {
        data: group,
        options: options
      })
        .then(function() {
          Alert.notify.success('Group Cloned')
          callback()
          sendUpdate(group)
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function sendUpdate(group) {
      ctrl.onUpdate(EventEmitter({ group: group }))
    }

    $scope.$on('groupClone:load', load)
  }
})()
