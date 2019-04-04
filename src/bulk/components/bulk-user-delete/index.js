import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserDelete', {
  template,
  controller,
  bindings: {
    data: '<'
  }
})

controller.$inject = ['BulkImportService', 'Route']
function controller(BulkImportService, Route) {
  var ctrl = this
  ctrl.canComplete = canComplete
  ctrl.complete = complete
  ctrl.select = select
  ctrl.$onInit = onInit
  ctrl.task = 'user.delete'

  function select() {
    Route.open('bulk/users').search({ next: ctrl.task })
  }

  function onInit() {
    ctrl.currentUsers = _.map(ctrl.data.users, 'userId').join('<br>')
  }

  function canComplete() {
    return ctrl.data.users.length > 0
  }

  function complete() {
    var data = ctrl.data.users.map(function(user) {
      return {
        task: ctrl.task,
        userId: user.userId,
        serviceProviderId: user.serviceProviderId,
        groupId: user.groupId
      }
    })
    // console.log(JSON.stringify(data, null, 2))
    BulkImportService.open(data)
  }
}
