;(function() {
  angular.module('odin.bulk').component('bulkSelectedUsers', {
    templateUrl: 'bulk/components/selectedUsers/selectedUsers.component.html',
    bindings: { task: '<' },
    controller: Controller
  })
  function Controller(BulkUsersService, $location) {
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
})()
