;(function() {
  angular.module('odin.group').component('groupDepartmentDetails', {
    templateUrl: 'group/components/departments/details.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      name: '<'
    }
  })

  function Controller(GroupDepartmentService, Alert, Route) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
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

    function onChanges(changes) {
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
      if (changes.name) {
        ctrl.name = changes.name.currentValue
      }
    }

    function loadDepartment() {
      return GroupDepartmentService.show(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.name
      ).then(function(data) {
        console.log('department', data)
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
          console.log('update', department, ctrl.name)
          if (department.newName !== ctrl.name) {
            return open(department.newName)
          } else {
            return loadDepartment()
          }
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
              console.log('error', error)
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
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'departments',
          'department'
        ).search({ name: name })
      } else {
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          ctrl.groupId,
          'departments'
        )
      }
    }
  }
})()
