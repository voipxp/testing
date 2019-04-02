import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userDelete', {
  template,
  controller,
  bindings: { userId: '<', groupId: '<', serviceProviderId: '<' }
})

controller.$inject = ['Alert', 'UserService', 'Route']
function controller(Alert, UserService, Route) {
  var ctrl = this
  ctrl.remove = remove

  function remove() {
    Alert.confirm
      .open('Are you sure you want to remove ' + ctrl.userId + '?')
      .then(function() {
        Alert.spinner.open()
        return UserService.destroy(ctrl.userId)
          .then(function() {
            Alert.notify.success('User Removed')
            Route.open('groups', ctrl.serviceProviderId, ctrl.groupId, 'users')
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }
}
