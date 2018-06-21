;(function() {
  angular.module('odin.group').component('groupCallCenterDnisInstance', {
    templateUrl:
      'group/components/callCenters/callCenter/advanced/dnisInstance.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      serviceUserId: '<',
      dnisId: '<'
    }
  })

  function Controller() {
    this.$onInit = function() {
      console.log('DNIS', this)
    }
  }
})()
