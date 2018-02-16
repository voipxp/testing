;(function() {
  angular.module('odin.bulk').component('bulkDashboard', {
    templateUrl: 'bulk/components/dashboard/bulkDashboard.component.html',
    controller: Controller
  })

  function Controller(Route, BulkTaskService) {
    var ctrl = this
    ctrl.open = open
    ctrl.openCsv = openCsv
    ctrl.services = BulkTaskService.index

    var route = Route.open('bulk')

    function open(service) {
      route(service.task)
    }

    function openCsv() {
      route('csv')
    }
  }
})()
