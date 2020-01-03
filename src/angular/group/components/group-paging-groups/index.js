import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroups', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Route', 'ACL']
function controller(Route, ACL) {
  var ctrl = this
  ctrl.open = open
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')

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
