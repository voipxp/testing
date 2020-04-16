import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserAuthenticationUpdate', {
  template,
  controller
})

controller.$inject = ['BulkImportService', '$scope']
function controller(BulkImportService, $scope) {
  var ctrl = this
  ctrl.onSelectUsers = onSelectUsers
  ctrl.canComplete = canComplete
  ctrl.complete = complete
  ctrl.data = { users: [] }
  ctrl.updatePassword = updatePassword
  ctrl.updateUserName = updateUserName
  ctrl.userNameAction = 'manual'
  ctrl.passwordAction = 'auto'
  ctrl.newPassword = '{{ generateSipPassword }}'

  function onSelectUsers(event) {
    ctrl.data = event
  }

  function updatePassword() {
    console.log('updatePassword', ctrl.passwordAction)
    ctrl.newPassword =
      ctrl.passwordAction === 'auto' ? '{{ generateSipPassword }}' : null
  }

  function updateUserName() {
    ctrl.userName = null
  }

  function canComplete() {
    return (
      (ctrl.userNameAction === 'skip' || ctrl.userName) &&
      (ctrl.passwordAction === 'skip' || ctrl.newPassword)
    )
  }

  function complete() {
    var data = ctrl.data.users.map(function(user) {
      return {
        task: 'user.authentication.update',
        userId: user.userId,
        groupId: user.groupId,
        serviceProviderId: user.serviceProviderId,
		    phoneNumber: user.phoneNumber,
        userName: ctrl.userName,
        newPassword: ctrl.newPassword,
        rebuildDevice: ctrl.rebuildDevice ? "true" : "false",
        resetDevice: ctrl.resetDevice ? "true" : "false"
      }
    })

    BulkImportService.open(data)
  }
}
