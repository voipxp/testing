import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMeetMe', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = ['$routeParams', 'Route', 'Session']
function controller($routeParams, Route, Session) {
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
