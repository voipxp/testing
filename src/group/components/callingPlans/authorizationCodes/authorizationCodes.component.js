;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanAuthorizationCodes', {
      templateUrl:
        'group/components/callingPlans/authorizationCodes/authorizationCodes.component.html',
      controller: Controller
    })

  function Controller(
    $routeParams,
    Alert,
    GroupOutgoingCallingPlanAuthorizationCodeService,
    $scope
  ) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.departmentName = departmentName
    ctrl.codeList = codeList
    ctrl.$onInit = activate
    ctrl.edit = edit
    ctrl.updated = updated

    function activate() {
      ctrl.loading = true
      loadCodes()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadCodes() {
      return GroupOutgoingCallingPlanAuthorizationCodeService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        '*'
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function departmentName(department) {
      if (!department) return
      return (
        (department.department && department.department.name) || 'Group Default'
      )
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

    function updated(department, didChange) {
      console.log('Department Updated', department)
      if (didChange) activate()
    }
  }
})()
