;(function() {
  angular.module('odin.group').component('groupCallCenterNavigation', {
    templateUrl: 'group/components/callCenters/navigation.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route, $location) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.serviceUserId = $routeParams.serviceUserId
    ctrl.dnisId = $routeParams.dnisId
    ctrl.returnTo = $location.search().returnTo
    ctrl.open = open

    function open(obj) {
      var id = (obj && obj.serviceUserId) || obj
      var hash = id ? 'Advanced' : null
      $location.hash(hash)
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId)(
        'callCenters',
        id
      ).hash(hash)
    }
  }
})()
