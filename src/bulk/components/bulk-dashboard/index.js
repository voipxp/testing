import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkDashboard', {
  template,
  controller
})

controller.$inject = ['BulkTaskService', '$location']
function controller(BulkTaskService, $location) {
  var ctrl = this
  ctrl.open = open
  ctrl.openCsv = openCsv
  ctrl.services = BulkTaskService.index

  function open(service) {
    if (service.task === 'user.create') {
      $location.path('bulk/user.create')
    } else {
      $location.path('bulk/users').search({ next: service.task })
    }
  }

  function openCsv() {
    $location.path('bulk/csv')
  }
}
