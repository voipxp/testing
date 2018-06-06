;(function() {
  angular.module('odin.bulk').component('bulkTaskHeader', {
    templateUrl: 'bulk/components/header/bulkTaskHeader.component.html',
    controller: Controller,
    bindings: { task: '<' }
  })

  function Controller(BulkTaskService) {
    var ctrl = this
    ctrl.$onInit = onInit

    function onInit() {
      if (ctrl.task === 'user.create') {
        ctrl.hideUsers = true
      }
      ctrl.action = BulkTaskService.get(ctrl.task)
    }
  }
})()
