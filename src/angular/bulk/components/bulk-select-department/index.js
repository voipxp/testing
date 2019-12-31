import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectDepartment', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    department: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['Alert', 'EventEmitter', 'GroupDepartmentService', 'Session']
function controller(Alert, EventEmitter, GroupDepartmentService, Session) {
  var ctrl = this
  ctrl.complete = complete
  ctrl.add = add
  ctrl.isDepartmentAdmin = (Session.data('loginType') === 'Group Department')
  ctrl.defaultDepartmentName = Session.data('groupDepartmentName') || null

  function loadParents() {
    return GroupDepartmentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      true
    ).then(function(data) {
      ctrl.parents = data
      return data
    })
  }

  function add() {
    ctrl.newDepartment = {
      groupId: ctrl.groupId,
      serviceProviderId: ctrl.serviceProviderId
    }
    Alert.spinner.open()
    loadParents()
      .then(function() {
        Alert.modal.open('groupDepartmentCreateModal', function(close) {
          create(ctrl.newDepartment, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function create(department, callback) {
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
    /* If Group department admin is logged in*/
    if(ctrl.isDepartmentAdmin) {
      department.name = ctrl.defaultDepartmentName
      department.groupId = ctrl.groupId
      department.serviceProviderId = ctrl.serviceProviderId
    }
    ctrl.onUpdate(EventEmitter({ department: department }))
  }
}
