;(function() {
  angular.module('odin.bulk').component('bulkSelectedUsers', {
    templateUrl: 'bulk/components/selectedUsers/selectedUsers.component.html',
    bindings: { users: '<', task: '<' },
    controller: Controller
  })
  function Controller(Route, BulkUsersService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open

    function onInit() {
      BulkUsersService.get().then(function(data) {
        ctrl.users = data.users || []
      })
    }

    function open() {
      Route.open('bulk/users')().search({ next: ctrl.next })
    }
  }
})()
