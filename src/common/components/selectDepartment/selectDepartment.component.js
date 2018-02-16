;(function() {
  angular.module('odin.common').component('selectDepartment', {
    templateUrl:
      'common/components/selectDepartment/selectDepartment.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      ngRequired: '<',
      ngModel: '='
    }
  })

  function Controller(Alert, GroupDepartmentService) {
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
})()
