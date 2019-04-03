import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('groupClone', {
  template,
  controller,
  bindings: { serviceProviderId: '<', onUpdate: '&' }
})

controller.$inject = [
  'EventEmitter',
  'ServiceProviderService',
  'GroupCloneService',
  '$scope',
  'Alert',
  'ACL'
]
function controller(
  EventEmitter,
  ServiceProviderService,
  GroupCloneService,
  $scope,
  Alert,
  ACL
) {
  var ctrl = this
  ctrl.selectServiceProvider = selectServiceProvider
  ctrl.selectGroup = selectGroup
  ctrl.onSelectServiceProvider = onSelectServiceProvider
  ctrl.onSelectGroup = onSelectGroup

  function selectServiceProvider() {
    Alert.spinner.open()
    ServiceProviderService.show(ctrl.serviceProviderId)
      .then(function(serviceProvider) {
        $scope.$broadcast('selectServiceProvider:load', {
          isEnterprise: serviceProvider.isEnterprise
        })
      })
      .finally(Alert.spinner.close)
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
    if (ctrl.fromServiceProviderId === ctrl.serviceProviderId) {
      ctrl.canCloneNetworkClassOfService = true
      ctrl.options.networkClassOfService = true
    } else {
      ctrl.canCloneNetworkClassOfService = ctrl.isSystem
      ctrl.options.networkClassOfService = ctrl.isSystem
    }
  }

  function onSelectGroup(event) {
    ctrl.fromGroupId = event.groupId
  }

  function load() {
    ctrl.isSystem = ACL.has('System')
    ctrl.isProvisioning = ACL.has('Provisioning')
    if (!ctrl.isProvisioning) {
      ctrl.fromServiceProviderId = ctrl.serviceProviderId
    }
    ctrl.groupId = null
    ctrl.group = {}
    ctrl.options = {
      featureAccessCode: true,
      callProcessingPolicy: true,
      networkClassOfService: false,
      extensionLength: true,
      services: true,
      policy: true,
      schedule: true,
      outgoingCallingPlan: true,
      routingProfile: true
    }
    Alert.modal.open('cloneGroupModal', function(close) {
      ctrl.group.serviceProviderId = ctrl.serviceProviderId
      create(ctrl.group, ctrl.options, close)
    })
  }

  function create(group, options, callback) {
    Alert.spinner.open()
    GroupCloneService.all(ctrl.fromServiceProviderId, ctrl.fromGroupId, {
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
