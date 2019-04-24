import angular from 'angular'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupOutgoingCallingPlanTransferNumbers', {
    template,
    controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = ['Alert', 'GroupOutgoingCallingPlanTransferNumberService']
function controller(Alert, GroupOutgoingCallingPlanTransferNumberService) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.edit = edit

  function activate() {
    ctrl.loading = true
    loadDepartments()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDepartments() {
    return GroupOutgoingCallingPlanTransferNumberService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.plan = data
      return data
    })
  }

  function edit(department) {
    ctrl.editDepartment = angular.copy(department)
    Alert.modal.open(
      'editGroupOutgoingCallingPlanTransferNumber',
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
    GroupOutgoingCallingPlanTransferNumberService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      plan
    )
      .then(loadDepartments)
      .then(function() {
        Alert.notify.success('Department Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
