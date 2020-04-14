import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('autoAttendants', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupAutoAttendantService',
  'Route',
  '$scope',
  '$q',
  'GroupPolicyService',
  'ACL',
  'Module'
]
function controller(
  Alert,
  GroupAutoAttendantService,
  Route,
  $scope,
  $q,
  GroupPolicyService,
  ACL,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.visual = visual
  ctrl.onCreate = onCreate
  ctrl.toggle = toggle
  ctrl.clone = clone
  ctrl.isGroupDepartmentAdmin = ACL.is('Group Department')
  ctrl.myObj = {
    "margin" : "1px "
}
  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadAutoAttendants(), GroupPolicyService.load(), loadModule()])
      .then(function() {
        ctrl.canCreate = GroupPolicyService.enhancedServiceCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })

    // return loadAutoAttendants()
    //   .catch(function(error) {
    //     Alert.notify.danger(error)
    //   })
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

	function loadModule() {
		if( ACL.is('Group Department') || ACL.is('Group') ) {
			return Module.show('Auto Attendant').then(function(data) {
			  ctrl.module = data
			})
		}
	}

  function loadAutoAttendants() {
    return GroupAutoAttendantService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      if(!ACL.is('Group Department')) ctrl.autoAttendants = data
      else ctrl.autoAttendants = ACL.filterByDepartment(data)
    })
  }

  function open(autoAttendant) {
    if(ACL.is('Group')){
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'groupService',
        'autoAttendants',
        'autoAttendant',
        autoAttendant.serviceUserId
      )
    }else{
      Route.open(
        'groups',
        ctrl.serviceProviderId,
        ctrl.groupId,
        'autoAttendants',
        'autoAttendant'
      ).search({ serviceUserId: autoAttendant.serviceUserId })
    }
    
  }

  function toggle(service) {
    service.isLoading = true
    GroupAutoAttendantService.status(service)
      .then(loadAutoAttendants)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(function(error) {
        service.isActive = !service.isActive
        Alert.notify.danger(error)
      })
  }

  function add() {
    $scope.$broadcast('autoAttendantCreate:load')
  }

  function visual() {
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'autoAttendants',
      'visual'
    )
  }

  function clone() {
    $scope.$broadcast('groupCloneAutoAttendant:load')
  }

  function onCreate(event) {
    open(event.autoAttendant)
  }
}
