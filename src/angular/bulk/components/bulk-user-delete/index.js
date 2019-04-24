import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserDelete', {
  template,
  controller
})

controller.$inject = ['BulkImportService']
function controller(BulkImportService) {
  var ctrl = this
  ctrl.complete = complete
  ctrl.onSelectUsers = onSelectUsers
  ctrl.data = { users: [] }

  function onSelectUsers(event) {
    ctrl.data = event
  }

  function complete() {
    var data = ctrl.data.users.map(function(user) {
      return {
        task: 'user.delete',
        userId: user.userId,
        serviceProviderId: user.serviceProviderId,
        groupId: user.groupId
      }
    })
    // console.log(JSON.stringify(data, null, 2))
    BulkImportService.open(data)
  }
}
