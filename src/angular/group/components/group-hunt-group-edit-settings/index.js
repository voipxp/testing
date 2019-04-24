import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroupEditSettings', {
  template,
  controller,
  bindings: { huntGroup: '=', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['GroupHuntGroupService', 'ACL']
function controller(GroupHuntGroupService, ACL) {
  var ctrl = this
  ctrl.options = GroupHuntGroupService.options
  ctrl.hasVersion20 = ACL.hasVersion('20')
}
