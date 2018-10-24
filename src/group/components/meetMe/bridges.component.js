;(function() {
  angular.module('odin.group').component('groupMeetMeBridges', {
    templateUrl: 'group/components/meetMe/bridges.component.html',
    controller: Controller,
    require: { parent: '^groupMeetMe' }
  })

  function Controller(Alert, GroupMeetMeConferencingBridgeService, $scope) {
    var ctrl = this

    ctrl.$onInit = activate
    ctrl.add = add

    function activate() {
      ctrl.loading = true
      return loadBridges()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadBridges() {
      return GroupMeetMeConferencingBridgeService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.groupId
      ).then(function(data) {
        ctrl.bridges = data
        return data
      })
    }

    function add() {
      $scope.$broadcast('groupMeetMeCreate:load')
    }
  }
})()
