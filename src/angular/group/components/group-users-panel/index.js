import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupUsersPanel', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', limitTo: '<' }
})

controller.$inject = [
  'Alert',
  'UserService',
  '$scope',
  '$location',
  'Route',
  'ServiceProviderPolicyService',
  '$q'
]
function controller(
  Alert,
  UserService,
  $scope,
  $location,
  Route,
  ServiceProviderPolicyService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.add = add
  ctrl.bulk = bulk
  ctrl.onCreate = onCreate
  ctrl.onPagination = onPagination

  function onPagination(event) {
    ctrl.pager = event.pager
  }

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadUsers(), ServiceProviderPolicyService.load()])
      .then(function() {
        ctrl.canCreate = ServiceProviderPolicyService.userCreate()
      })
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })

    // loadUsers()
    //   .catch(function(error) {
    //     Alert.notify.danger(error)
    //   })
    //   .finally(function() {
    //     ctrl.loading = false
    //   })
  }

  function loadUsers() {
    return UserService.index(ctrl.serviceProviderId, ctrl.groupId).then(function(data) {
      ctrl.users = data.map(user => {
        return { ...user, name: [user.firstName, user.lastName].join(' ') }
      })
    })
  }

  function add() {
    $scope.$broadcast('userCreate:load')
  }

  function bulk() {
    var returnTo = $location.url()
    $location.path('/bulk/user.create').search({
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      returnTo: returnTo
    })
  }

  function onCreate(event) {
    open({ item: event.user })
  }

  function open(event) {
    var user = event.item
    Route.open('users', ctrl.serviceProviderId, ctrl.groupId, user.userId)
  }
}
