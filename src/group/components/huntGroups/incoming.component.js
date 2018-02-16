;(function() {
  angular.module('odin.group').component('groupHuntGroupIncoming', {
    templateUrl: 'group/components/huntGroups/incoming.component.html',
    controller: Controller,
    require: { parent: '^groupHuntGroup' }
  })

  function Controller(GroupHuntGroupService) {
    this.options = GroupHuntGroupService.options
  }
})()
