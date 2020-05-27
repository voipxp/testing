import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserIntegratedImpUpdate', {
  template,
  controller
})

controller.$inject = ['BulkImportService', '$scope', '$window']
function controller(BulkImportService, $scope, $window) {
  var ctrl = this
  ctrl.isActive = false
  ctrl.onSelectUsers = onSelectUsers
  ctrl.complete = complete
  ctrl.data = { users: [] }
  ctrl.goBack = goBack

  function onSelectUsers(event) {
    ctrl.data = event
  }

  function complete() {
    var data = ctrl.data.users.map(function(user) {
      return {
        task: 'user.integrated.imp.update',
        userId: user.userId,
        groupId: user.groupId,
        serviceProviderId: user.serviceProviderId,
        isActive: ctrl.isActive
      }
    })
    BulkImportService.open(data)
  }

  function goBack() {
    $window.history.back()
  }
}
