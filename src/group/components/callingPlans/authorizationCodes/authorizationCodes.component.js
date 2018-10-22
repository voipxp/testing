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
})()
