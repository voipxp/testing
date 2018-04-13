;(function() {
  angular.module('odin.group').component('groupCallProcessingPolicy', {
    templateUrl:
      'group/components/callProcessingPolicy/callProcessingPolicy.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, GroupCallProcessingPolicyService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.options = GroupCallProcessingPolicyService.options
    function onInit() {
      ctrl.loading = true
      return loadCallProcessingPolicy()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCallProcessingPolicy() {
      return GroupCallProcessingPolicyService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.callProcessingPolicy = data
        return data
      })
    }
    function edit() {
      loadCallProcessingPolicy().then(function(data) {
        ctrl.callProcessingPolicy = data
        ctrl.editCallProcessingPolicy = angular.copy(ctrl.callProcessingPolicy)
        Alert.modal.open('editGroupCallProcessingPolicyModal', function(close) {
          update(ctrl.editCallProcessingPolicy, close)
        })
      })
    }

    function update(editCallProcessingPolicy, close) {
      Alert.spinner.open()
      GroupCallProcessingPolicyService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        editCallProcessingPolicy
      )
        .then(loadCallProcessingPolicy)
        .then(function() {
          Alert.notify.success('Call Processing Policy Updated')
          close()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
