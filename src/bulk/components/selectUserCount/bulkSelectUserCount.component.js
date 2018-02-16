;(function() {
  angular.module('odin.bulk').component('bulkSelectUserCount', {
    templateUrl:
      'bulk/components/selectUserCount/bulkSelectUserCount.component.html',
    controller: Controller,
    bindings: {
      onUpdate: '&',
      serviceProviderId: '<',
      groupId: '<',
      userCount: '<'
    }
  })

  function Controller(Alert, EventEmitter, GroupService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.complete = complete

    function onInit() {
      ctrl.loading = true
      loadGroup()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroup() {
      return GroupService.show(ctrl.serviceProviderId, ctrl.groupId).then(
        function(data) {
          ctrl.group = data
          ctrl.max = ctrl.group.userLimit - ctrl.group.userCount
          console.log('group', data)
        }
      )
    }

    function complete() {
      ctrl.onUpdate(EventEmitter({ userCount: ctrl.userCount }))
    }
  }
})()
