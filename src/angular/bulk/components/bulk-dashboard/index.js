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
    $location.path(`bulk/${service.task}`)
  }

  function openCsv() {
    $location.path('bulk/csv')
  }
}
