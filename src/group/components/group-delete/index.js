import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDelete', {
  template,
  controller
})

controller.$inject = ['Alert', 'GroupService', 'Route', '$routeParams']
function controller(Alert, GroupService, Route, $routeParams) {
  var ctrl = this
  ctrl.remove = remove

  ctrl.serviceProviderId = $routeParams.serviceProviderId
  ctrl.groupId = $routeParams.groupId

  function remove() {
    Alert.confirm
      .open('Are you sure you want to remove ' + ctrl.groupId + '?')
      .then(function() {
        Alert.spinner.open()
        return GroupService.destroy(ctrl.serviceProviderId, ctrl.groupId)
          .then(function() {
            Alert.notify.success('Group Removed')
            Route.open('serviceProviders', ctrl.serviceProviderId, 'groups')
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
