import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupHuntGroups', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupHuntGroupService',
  'Route',
  '$scope',
  'GroupPolicyService',
  '$q',
  'ACL',
  'Module'
]
function controller(
  Alert,
  GroupHuntGroupService,
  Route,
  $scope,
  GroupPolicyService,
  $q,
  ACL,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.toggle = toggle
  ctrl.add = add
  ctrl.onCreate = onCreate
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')
console.log(ctrl)
  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadHuntGroups(), GroupPolicyService.load(), loadModule()])
      .then(function() {
        ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })

    // loadHuntGroups()
    //   .catch(Alert.notify.danger)
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

	function loadModule() {
		if(ACL.is('Group Department')) {
			return Module.show('Hunt Group').then(function(data) {
			  ctrl.module = data
			})
		}
	}

  function loadHuntGroups() {
    return GroupHuntGroupService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      if(ACL.is('Group Department')) data = ACL.filterByDepartment(data)
      ctrl.huntGroups = data
    })
  }

  function toggle(service) {
    service.isLoading = true
    GroupHuntGroupService.status(service)
      .then(loadHuntGroups)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(Alert.notify.danger)
  }

  function open(huntgroup) {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'huntGroups',
      'huntGroup'
    ).search({
      serviceUserId: huntgroup.serviceUserId
    })
  } 
  
  function add() {
    $scope.$broadcast('groupHuntGroupCreate:load')
  }

  function onCreate(event) {
    open(event.huntGroup)
  }
}
