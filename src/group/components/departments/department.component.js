;(function() {
  angular.module('odin.group').component('groupDepartment', {
    templateUrl: 'group/components/departments/department.component.html',
    controller: Controller
  })

  function Controller($routeParams, $location, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.name = $location.search().name

    ctrl.goBack = function() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'departments')
    }
  }
})()
