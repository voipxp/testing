import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkTaskHeader', {
  template,
  controller,
  bindings: { task: '<' }
})

controller.$inject = ['BulkTaskService']
function controller(BulkTaskService) {
  var ctrl = this
  ctrl.$onInit = onInit

  function onInit() {
    if (ctrl.task === 'user.create') {
      ctrl.hideUsers = true
    }
    ctrl.action = BulkTaskService.get(ctrl.task)
  }
}
