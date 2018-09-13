;(function() {
  angular.module('odin.group').component('groupPagingNav', {
    templateUrl: 'group/components/paging/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.open = open

    function open(serviceUserId) {
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'paging',
        serviceUserId
      )
    }
  }
})()
