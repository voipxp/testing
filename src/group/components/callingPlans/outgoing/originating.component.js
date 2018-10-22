;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanOriginating', {
      templateUrl:
        'group/components/callingPlans/outgoing/originating.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '<', groupId: '<' }
    })

  function Controller(Alert, GroupOutgoingCallingPlanOriginatingService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = GroupOutgoingCallingPlanOriginatingService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return GroupOutgoingCallingPlanOriginatingService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.plan = data
        console.log('originating', data)
        return data
      })
    }

    function edit(department) {
      ctrl.editDepartment = angular.copy(department)
      console.log('editDepartment', ctrl.editPlan)
      Alert.modal.open(
        'editGroupOutgoingCallingPlanOriginating',
        function onSave(close) {
          update(ctrl.editDepartment, close)
        }
      )
    }

    function update(department, callback) {
      var plan = {
        serviceProviderId: ctrl.serviceProviderId,
        groupId: ctrl.groupId,
        departments: [department]
      }
      Alert.spinner.open()
      GroupOutgoingCallingPlanOriginatingService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        plan
      )
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('Plan Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
