import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupPagingGroupsList', {
  template,
  controller,
  require: { parent: '^groupPagingGroups' }
})

controller.$inject = ['Alert', 'GroupPagingGroupService', '$scope', 'ACL', 'Module', '$q']
function controller(Alert, GroupPagingGroupService, $scope, ACL, Module, $q) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.add = add
  ctrl.toggle = toggle

  function activate() {
    ctrl.open = ctrl.parent.open
    ctrl.loading = true

	return $q
      .all([
        loadInstances(),
		loadModule()
      ])
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })

  }

	function loadModule() {
			return Module.show('Group Paging').then(function(data) {
			  ctrl.module = data
			})
	}

  function loadInstances() {
    return GroupPagingGroupService.index(
      ctrl.parent.serviceProviderId,
      ctrl.parent.groupId
    ).then(function(data) {
      if(ACL.is('Group Department')) data = ACL.filterByDepartment(data)
      ctrl.instances = data
      return data
    })
  }

  function add() {
    $scope.$broadcast('groupPagingGroupCreate:load')
  }

  function toggle(service) {
    service.isLoading = true
    GroupPagingGroupService.status(service)
      .then(loadInstances)
      .then(function() {
        if (service.isActive) {
          Alert.notify.success('Service Enabled')
        } else {
          Alert.notify.warning('Service Disabled')
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
