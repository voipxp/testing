;(function() {
  angular.module('odin.group').component('groupCallCenterNavigation', {
    templateUrl: 'group/components/callCenters/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, $location, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $location.search().serviceUserId
    ctrl.open = open

    // TODO
    // Make this display inline
    function open() {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callCenters')
    }
  }
})()
