import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectedUsers', {
  template,
  controller,
  bindings: { task: '<' }
})

controller.$inject = ['BulkUsersService', '$location']
function controller(BulkUsersService, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.open = open

  function onInit() {
    BulkUsersService.get().then(function(data) {
      ctrl.users = data.users || []
    })
  }

  function open() {
    $location.path('bulk/users').search({ next: ctrl.task })
  }
}
