import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMeetMeBridges', {
  template,
  controller,
  require: { parent: '^groupMeetMe' }
})

controller.$inject = ['Alert', 'GroupMeetMeConferencingBridgeService', '$scope']
function controller(Alert, GroupMeetMeConferencingBridgeService, $scope) {
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
