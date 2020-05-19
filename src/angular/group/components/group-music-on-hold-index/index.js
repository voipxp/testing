import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupMusicOnHoldIndex', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupMusicOnHoldService',
  'GroupDepartmentService',
  'Route',
  '$q',
  'ACL',
  'Module',
  'Session'
]
function controller(
  Alert,
  GroupMusicOnHoldService,
  GroupDepartmentService,
  Route,
  $q,
  ACL,
  Module,
  Session
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')

  function onInit() {
    ctrl.moh = {}
    ctrl.loading = true
      $q.all([loadMusicOnHold(), loadModule()])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadModule() {
			return Module.show('Music On Hold').then(function(data) {
        ctrl.module = data
			})
  }

  function loadMusicOnHold() {
    return GroupMusicOnHoldService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      if(ctrl.isGroupDepartmentAdmin) data = filterByDepartment(data)
      ctrl.moh = data
    })
  }

  function filterByDepartment(data) {
    data.departments = data.departments.
    filter( function(el) {
      return ( el.fullPathName === Session.data('groupDepartmentPathName') )
    })

    return data
  }

  function loadDepartments() {
    return GroupDepartmentService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      true
    ).then(function(data) {
      return data
    })
  }

  function open(department) {
    department = department || {}
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'musicOnHold',
      'instance'
    ).search({
      departmentName: department.name,
      isEnterpriseDepartment: department.isEnterpriseDepartment
    })
  }

  function add() {
    Alert.spinner.open()
    loadDepartments()
      .then(function(departments) {
        ctrl.newMoh = {
          serviceProviderId: ctrl.serviceProviderId,
          groupId: ctrl.groupId,
          isActiveDuringCallHold: true,
          isActiveDuringCallPark: true,
          isActiveDuringBusyCampOn: true,
          useAlternateSourceForInternalCalls: false,
          source: {
            audioFilePreferredCodec: 'None',
            messageSourceSelection: 'System'
          }
        }
        // filter out ones that are already setup
        ctrl.departments = _.filter(departments, function(department) {
          return !_.find(ctrl.moh.departments, {
            fullPathName: department.fullPathName
          })
        })
        Alert.modal.open('groupMusicOnHoldCreate', function onSave(close) {
          create(ctrl.newMoh, close)
        })
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function create(moh, callback) {
    Alert.spinner.open()
    GroupMusicOnHoldService.store(ctrl.serviceProviderId, ctrl.groupId, moh)
      .then(loadMusicOnHold)
      .then(function() {
        Alert.notify.success('Music On Hold Department Created')
        callback()
        open(moh.department)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
