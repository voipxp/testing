import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMeetMe', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route', 'Session', 'ACL']
function controller(Route, Session, ACL) {
  var ctrl = this
  ctrl.loginType = Session.data('loginType')
  ctrl.open = open
  ctrl.state = 'list'
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')

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
