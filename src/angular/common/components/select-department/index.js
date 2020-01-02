import angular from 'angular'
import template from './index.html'

angular.module('odin.common').component('selectDepartment', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    ngRequired: '<',
    ngModel: '=',
    ngDisabled: '<'
  }
})

controller.$inject = ['Alert', 'GroupDepartmentService']
function controller(Alert, GroupDepartmentService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    ctrl.loading = true
    loadDepartments()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDepartments() {
    return GroupDepartmentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.departments = data
      return data
    })
  }
}
