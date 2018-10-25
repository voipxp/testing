;(function() {
  angular.module('odin.group').component('groupPagingGroups', {
    templateUrl: 'group/components/paging/groups.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.open = open

    function open(serviceUserId) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'paging',
        'group'
      ).search({ serviceUserId: serviceUserId })
    }
  }
})()
