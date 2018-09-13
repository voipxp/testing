;(function() {
  angular.module('odin.group').component('groupDepartments', {
    templateUrl: 'group/components/departments/departments.component.html',
    controller: Controller
  })

  function Controller(Alert, GroupDepartmentService, $routeParams, Route) {
    var ctrl = this

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.$onInit = onInit
    ctrl.add = add
    ctrl.open = open
    ctrl.selectPhoneNumber = selectPhoneNumber

    function onInit() {
      ctrl.loading = true
      loadDepartments()
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
        ctrl.groupId,
        true
      ).then(function(data) {
        console.log('departments', data)
        ctrl.departments = data
      })
    }

    function add() {
      ctrl.newDepartment = {}
      ctrl.selectedParent = null
      Alert.modal.open('groupDepartmentCreateModal', function onSave(close) {
        save(ctrl.newDepartment, close)
      })
    }

    function save(department, callback) {
      console.log('save', department)
      Alert.spinner.open()
      GroupDepartmentService.store(
        ctrl.serviceProviderId,
        ctrl.groupId,
        department
      )
        .then(function() {
          console.log('save', department)
          if (_.isFunction(callback)) {
            callback()
          }
          open(department)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function selectPhoneNumber(event) {
      ctrl.newDepartment.callingLineIdPhoneNumber = event.phoneNumber
    }

    function open(department) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'departments',
        department.name
      )
    }
  }
})()
