import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDepartmentDetails', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    name: '<'
  }
})

controller.$inject = ['GroupDepartmentService', 'Alert', 'Route', '$route']
function controller(GroupDepartmentService, Alert, Route, $route) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.selectPhoneNumber = selectPhoneNumber

  function onInit() {
    ctrl.loading = true
    return loadDepartment()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDepartment() {
    return GroupDepartmentService.show(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.name
    ).then(function(data) {
      ctrl.department = data
    })
  }

  function edit() {
    ctrl.editDepartment = angular.copy(ctrl.department)
    ctrl.editDepartment.newName = ctrl.editDepartment.name
    Alert.modal.open(
      'groupDepartmentEditModal',
      function onSave(close) {
        update(ctrl.editDepartment, close)
      },
      function onDelete(close) {
        remove(close)
      }
    )
  }

  function update(department, callback) {
    Alert.spinner.open()
    GroupDepartmentService.update(department)
      .then(function() {
        return department.newName === ctrl.name
          ? loadDepartment()
          : open(department.newName) && $route.reload()
      })
      .then(function() {
        Alert.notify.success('Department Updated')
        callback()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function remove(callback) {
    Alert.confirm
      .open('Are you sure you want to delete this Department?')
      .then(function() {
        Alert.spinner.open()
        GroupDepartmentService.destroy(
          ctrl.serviceProviderId,
          ctrl.groupId,
          ctrl.name
        )
          .then(function() {
            Alert.notify.success('Department Removed')
            callback()
            open()
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }

  function selectPhoneNumber(event) {
    ctrl.editDepartment.callingLineIdPhoneNumber = event.phoneNumber
  }

  function open(name) {
    if (name) {
      return Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'departments',
        'department'
      ).search({ name: name })
    } else {
      return Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'departments'
      )
    }
  }
}
