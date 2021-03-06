import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupOutgoingCallingPlanAuthorizationCodes', {
    template,
    controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = [
  'Alert',
  'GroupOutgoingCallingPlanAuthorizationCodeService',
  '$scope'
]
function controller(
  Alert,
  GroupOutgoingCallingPlanAuthorizationCodeService,
  $scope
) {
  var ctrl = this
  ctrl.departmentName = departmentName
  ctrl.codeList = codeList
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.loadCodes = loadCodes

  function onInit() {
    ctrl.loading = true
    loadCodes()
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function loadCodes() {
    return GroupOutgoingCallingPlanAuthorizationCodeService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(data => {
      ctrl.plan = data
      return data
    })
  }

  function departmentName(department) {
    if (!department) return
    return _.get(department, 'department.name', 'Group Default')
  }

  function codeList(object) {
    return _.map(object.codes, 'code').join(', ')
  }

  function edit(department) {
    $scope.$broadcast(
      'groupOutgoingCallingPlanDepartmentAuthorizationCodes:load',
      department
    )
  }
}
