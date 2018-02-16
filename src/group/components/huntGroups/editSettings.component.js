;(function() {
  angular.module('odin.group').component('groupHuntGroupEditSettings', {
    templateUrl: 'group/components/huntGroups/editSettings.component.html',
    controller: Controller,
    bindings: { huntGroup: '=', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(GroupHuntGroupService, ACL) {
    var ctrl = this
    ctrl.options = GroupHuntGroupService.options
    ctrl.hasVersion20 = ACL.hasVersion('20')
  }
})()
