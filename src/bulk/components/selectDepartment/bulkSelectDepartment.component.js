;(function() {
  angular.module('odin.bulk').component('bulkSelectDepartment', {
    templateUrl:
      'bulk/components/selectDepartment/bulkSelectDepartment.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      department: '<',
      onUpdate: '&'
    }
  })

  function Controller($q, Alert, EventEmitter, GroupDepartmentService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.complete = complete
    ctrl.add = add

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadDepartments(), loadParents()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
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
        console.log('departments', data)
        return data
      })
    }

    function loadParents() {
      return GroupDepartmentService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        true
      ).then(function(data) {
        ctrl.parents = data
        console.log('parents', data)
        return data
      })
    }

    function add() {
      ctrl.newDepartment = {
        groupId: ctrl.groupId,
        serviceProviderId: ctrl.serviceProviderId
      }
      Alert.modal.open('groupDepartmentCreateModal', function(close) {
        create(ctrl.newDepartment, close)
      })
    }

    function create(department, callback) {
      console.log('create', department)
      Alert.spinner.open()
      GroupDepartmentService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        department
      )
        .then(function() {
          ctrl.department = department
          complete()
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function complete() {
      var department = {}
      if (ctrl.department) {
        department.serviceProviderId = ctrl.department.serviceProviderId
        department.groupId = ctrl.department.groupId
        department.name = ctrl.department.name
      }
      ctrl.onUpdate(EventEmitter({ department: department }))
    }
  }
})()
