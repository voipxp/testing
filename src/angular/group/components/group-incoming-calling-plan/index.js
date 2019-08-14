import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupIncomingCallingPlan', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'GroupIncomingCallingPlanService', 'Module']
function controller(Alert, GroupIncomingCallingPlanService, Module) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.options = GroupIncomingCallingPlanService.options
  ctrl.edit = edit

  function activate() {
    Module.show('Incoming Calling Plan').then(function(module) {
      ctrl.module = module
    })
    ctrl.loading = true
    loadPlan()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return GroupIncomingCallingPlanService.show(ctrl.serviceProviderId, ctrl.groupId).then(function(
      data
    ) {
      ctrl.plan = data
      return data
    })
  }

  function edit(department) {
    ctrl.editDepartment = angular.copy(department)
    Alert.modal.open('editGroupIncomingCallingPlan', function onSave(close) {
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
    GroupIncomingCallingPlanService.update(ctrl.serviceProviderId, ctrl.groupId, plan)
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('Plan Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
