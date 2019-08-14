import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupAnonymousCallRejection', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = ['Alert', 'UserAnonymousCallRejectionService', 'Route', 'UserServiceService']
function controller(Alert, UserAnonymousCallRejectionService, Route, UserServiceService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open
  ctrl.toggle = toggle

  function onInit() {
    ctrl.loading = true
    return load()
      .catch(Alert.notify.danger)
      .finally(() => (ctrl.loading = false))
  }

  function load() {
    return UserAnonymousCallRejectionService.index(ctrl.serviceProviderId, ctrl.groupId).then(
      data => (ctrl.users = data)
    )
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
    const singleService = {
      userId: user.profile.userId,
      userServices: [user.service]
    }
    user.isLoading = true
    UserServiceService.update(singleService)
      .then(load)
      .then(function() {
        const message = user.service.assigned ? 'Assigned' : 'Unassigned'
        const action = user.service.assigned ? Alert.notify.success : Alert.notify.warning
        action(`${user.profile.userId} ${user.service.serviceName} ${message}`)
      })
      .catch(Alert.notify.danger)
      .finally(() => (user.isLoading = false))
  }
}
