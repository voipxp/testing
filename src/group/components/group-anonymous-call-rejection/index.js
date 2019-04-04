import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAnonymousCallRejection', {
  template,
  controller,
  bindings: { module: '<' }
})

controller.$inject = [
  '$routeParams',
  'Alert',
  'UserAnonymousCallRejectionService',
  'UserServiceService',
  'Route'
]
function controller(
  $routeParams,
  Alert,
  UserAnonymousCallRejectionService,
  UserServiceService,
  Route
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId
  ctrl.open = open
  ctrl.toggle = toggle

  function onInit() {
    ctrl.loading = true
    return load()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function load() {
    return UserAnonymousCallRejectionService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.users = data
    })
  }

  function open(user) {
    Route.open(
      'users',
      ctrl.serviceProviderId,
      ctrl.groupId,
      user.profile.userId,
      'anonymousCallRejection'
    )
  }

  function toggle(user) {
    var singleService = {
      userId: user.profile.userId,
      userServices: [user.service]
    }
    UserServiceService.update(singleService)
      .then(load)
      .then(function() {
        var message = user.service.assigned ? 'Assigned' : 'Unassigned'
        var action = user.service.assigned
          ? Alert.notify.success
          : Alert.notify.warning
        action(
          user.profile.userId + ' ' + user.service.serviceName + ' ' + message
        )
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {})
  }
}
