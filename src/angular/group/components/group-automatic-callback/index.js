import angular from 'angular'
import template from './index.html'
import { updateUserServices } from '@/store/user-services'

angular.module('odin.group').component('groupAutomaticCallback', {
  template,
  controller,
  bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'UserAutomaticCallbackService',
  'Route',
  '$ngRedux'
]
function controller(Alert, UserAutomaticCallbackService, Route, $ngRedux) {
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
    return UserAutomaticCallbackService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(data => (ctrl.users = data))
  }

  function open(user) {
    Route.open(
      'users',
      ctrl.serviceProviderId,
      ctrl.groupId,
      user.profile.userId,
      'automaticCallback'
    )
  }

  function toggle(user) {
    var singleService = {
      userId: user.profile.userId,
      userServices: [user.service]
    }
    user.isLoading = true
    $ngRedux
      .dispatch(updateUserServices(singleService))
      .then(load)
      .then(() => {
        const message = user.service.assigned ? 'Assigned' : 'Unassigned'
        const action = user.service.assigned
          ? Alert.notify.success
          : Alert.notify.warning
        action(`${user.profile.userId} ${user.service.serviceName} ${message}`)
      })
      .catch(Alert.notify.danger)
      .finally(() => (user.isLoading = false))
  }
}
