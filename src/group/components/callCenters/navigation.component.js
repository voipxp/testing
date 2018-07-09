;(function() {
  angular.module('odin.group').component('groupCallCenterNavigation', {
    templateUrl: 'group/components/callCenters/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.dnisId = $routeParams.dnisId
    ctrl.open = open

    // TODO
    // Make this display inline
    function open(obj) {
      var id = (obj && obj.serviceUserId) || obj
      var menu = id ? 'Advanced' : null
      Route.open()(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'callCenters',
        id
      ).search({ menu: menu })
    }
  }
})()
