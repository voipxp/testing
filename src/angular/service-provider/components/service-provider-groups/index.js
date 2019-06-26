import angular from 'angular'
import template from './index.html'
import gql from 'graphql-tag'

const query = gql`
  query getGroup($serviceProviderId: String!) {
    groups(serviceProviderId: $serviceProviderId) {
      _id
      groupId
      groupName
      userLimit
    }
  }
`

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
  'Module',
  'apollo'
]
function controller(
  Alert,
  GroupService,
  Route,
  $scope,
  $q,
  ServiceProviderPolicyService,
  Module,
  apollo
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
    return apollo
      .query({
        query,
        variables: { serviceProviderId: ctrl.serviceProviderId },
        fetchPolicy: 'network-only'
      })
      .then(data => (ctrl.groups = data.data.groups))
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
