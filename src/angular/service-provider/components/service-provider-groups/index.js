import angular from 'angular'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderGroups', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupService',
  'Route',
  '$scope',
  '$q',
  'ServiceProviderPolicyService',
  'Module'
]
function controller(
  Alert,
  GroupService,
  Route,
  $scope,
  $q,
  ServiceProviderPolicyService,
  Module
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.clone = clone
  ctrl.onCreate = onCreate
  ctrl.open = open
  ctrl.onPagination = onPagination

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadGroups(), ServiceProviderPolicyService.load(), Module.load()])
      .then(function() {
        ctrl.canCreate = ServiceProviderPolicyService.groupCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadGroups() {
    return GroupService.index(ctrl.serviceProviderId).then(data => {
      ctrl.groups = data
    })
  }

  function clone() {
    $scope.$broadcast('groupClone:load')
  }

  function add() {
    $scope.$broadcast('groupCreate:load')
  }

  function onCreate(event) {
    open(event.group)
  }

  function open(group) {
    Route.open('groups', ctrl.serviceProviderId, group.groupId)
  }
}
