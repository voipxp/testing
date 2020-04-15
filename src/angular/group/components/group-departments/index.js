import angular from 'angular'
import _ from 'lodash'
import template from './index.html'
import { useAcl } from '@/utils'


angular.module('odin.group').component('groupDepartments', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', hideNavigation: '<'}
  
})
 
controller.$inject = [
  'ACL',
  'Alert',
  'GroupDepartmentService',
  'Route',
  'GroupPolicyService',
  '$q',
  'Module',
  '$location'
]
function controller(
  ACL,
  Alert,
  GroupDepartmentService,
  Route,
  GroupPolicyService,
  $q,
  Module,
  $location
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.open = open
  ctrl.selectPhoneNumber = selectPhoneNumber

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadDepartments(), GroupPolicyService.load()])
      .then(function() {
        ctrl.canRead = GroupPolicyService.departmentRead()
        ctrl.canCreate = GroupPolicyService.departmentCreate()
        ctrl.canUpdate = GroupPolicyService.departmentUpdate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
    // loadDepartments()
    //   .catch(function(error) {
    //     Alert.notify.danger(error)
    //   })
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

  function loadDepartments() {
    return GroupDepartmentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      true
    ).then(function(data) {
      ctrl.departments = data
    })
  }

  function add() {
    ctrl.newDepartment = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    ctrl.selectedParent = null
    Alert.modal.open('groupDepartmentCreateModal', function onSave(close) {
      save(ctrl.newDepartment, close)
    })
  }

  function save(department, callback) {
    Alert.spinner.open()
    GroupDepartmentService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      department
    )
      .then(function() {
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
    if(!ctrl.canUpdate) return
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'departments',
      'department'
    ).search({ name: department.name })
  }
  
}
