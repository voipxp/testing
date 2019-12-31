import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterNavigation', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<', hideNavigation: '<' }
})

controller.$inject = ['$location', 'Route', 'ACL']
function controller($location, Route, ACL) {
  var ctrl = this
  ctrl.serviceUserId = $location.search().serviceUserId
  ctrl.open = open
  //ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')

  // TODO: Make this display inline
  function open() {
    if(ACL.is('Group Department')) {
      Route.open('department', ctrl.serviceProviderId, ctrl.groupId, 'callCenters')
    } else {
      Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'callCenters')
    }
  }
}
