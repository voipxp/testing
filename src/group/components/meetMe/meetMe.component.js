;(function() {
  angular.module('odin.group').component('groupMeetMe', {
    templateUrl: 'group/components/meetMe/meetMe.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Route, Session) {
    var ctrl = this
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.loginType = Session.data('loginType')
    ctrl.open = open
    ctrl.state = 'list'

    function open(groupId, bridgeId) {
      if (bridgeId) {
        Route.open(
          'groups',
          ctrl.serviceProviderId,
          groupId,
          'meetMe',
          'bridge'
        ).search({ serviceUserId: bridgeId })
      } else {
        Route.open('groups', ctrl.serviceProviderId, groupId, 'meetMe')
      }
    }
  }
})()
