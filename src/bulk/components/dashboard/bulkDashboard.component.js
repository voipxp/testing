;(function() {
  angular.module('odin.bulk').component('bulkDashboard', {
    templateUrl: 'bulk/components/dashboard/bulkDashboard.component.html',
    controller: Controller
  })

  function Controller(BulkTaskService, $location) {
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
})()
