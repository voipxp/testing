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

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadAutoAttendants(), GroupPolicyService.load(), loadModule(), loadModuleAABuilder()])
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
			return Module.show('Auto Attendant').then(function(data) {
			  ctrl.module = data
			})
  }
  
  function loadModuleAABuilder() {
    if(ACL.is('System')){
      ctrl.canCreateAA = true
    } else if(ACL.is('Provisioning')){
      ctrl.canCreateAA = true
    } else if(ACL.is('Service Provider')){
      ctrl.canCreateAA = true
    } else if(ACL.is('Group')){
      ctrl.canCreateAA = true
    } else if(ACL.is('Group Department')){
      ctrl.canCreateAA = true
    } else if(ACL.is('User')){
      ctrl.canCreateAA = true
    } else{
      ctrl.canCreateAA = false
    }
    return Module.show('Visual AA Builder').then(function(data) { 
      ctrl.moduleBuilder = data 
    })
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
    Route.open(
      'groups',
      ctrl.serviceProviderId,
      ctrl.groupId,
      'autoAttendants',
      'autoAttendant'
    ).search({ serviceUserId: autoAttendant.serviceUserId })
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
