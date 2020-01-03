import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupMeetMeBridges', {
  template,
  controller,
  require: { parent: '^groupMeetMe' }
})

controller.$inject = ['Alert', 'GroupMeetMeConferencingBridgeService', '$scope', 'ACL', 'Module', '$q']
function controller(Alert, GroupMeetMeConferencingBridgeService, $scope, ACL, Module, $q) {
  var ctrl = this

  ctrl.$onInit = activate
  ctrl.add = add

  function activate() {
    ctrl.loading = true
	
	return $q
      .all([
        loadBridges(),
		loadModule()
      ])
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
      if(ACL.is('Group Department')) data = ACL.filterByDepartment(data)
      ctrl.bridges = data
      return data
    })
  }

	function loadModule() {
		if(ACL.is('Group Department')) {
			return Module.show('Meet-Me Conferencing').then(function(data) {
			  ctrl.module = data
			})
		}
	}

  function add() {
    $scope.$broadcast('groupMeetMeCreate:load')
  }
}
