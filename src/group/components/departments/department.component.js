;(function() {
  angular.module('odin.group').component('groupDepartment', {
    templateUrl: 'group/components/departments/department.component.html',
    controller: Controller
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.name = $routeParams.name

    ctrl.goBack = function() {
      return Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'departments'
      )
    }
  }
})()
