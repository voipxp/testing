import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupOutgoingCallingPlanCallMeNow', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupOutgoingCallingPlanCallMeNowService']
function controller(Alert, GroupOutgoingCallingPlanCallMeNowService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = GroupOutgoingCallingPlanCallMeNowService.options

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
    return GroupOutgoingCallingPlanCallMeNowService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.plan = data
      return data
    })
  }

  function edit(department) {
    ctrl.editDepartment = angular.copy(department)
    Alert.modal.open('editGroupOutgoingCallingPlanCallMeNow', function onSave(
      close
    ) {
      update(ctrl.editDepartment, close)
    })
  }

  function update(department, callback) {
    var plan = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      departments: [department]
    }
    Alert.spinner.open()
    GroupOutgoingCallingPlanCallMeNowService.update(
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
