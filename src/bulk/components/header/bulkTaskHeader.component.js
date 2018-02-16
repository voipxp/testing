;(function() {
  angular.module('odin.bulk').component('bulkTaskHeader', {
    templateUrl: 'bulk/components/header/bulkTaskHeader.component.html',
    controller: Controller,
    bindings: {
      task: '<'
    }
  })

  function Controller(Route, BulkUsersService, BulkTaskService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.open = open
    ctrl.current = current

    function onInit() {
      if (ctrl.task === 'user.create') {
        ctrl.hideUsers = true
      }
      ctrl.action = BulkTaskService.get(ctrl.task)
      BulkUsersService.get().then(function(data) {
        ctrl.users = data.users || []
      })
    }

    function current() {
      return _.map(ctrl.users, 'userId').join('<br>')
    }

    function open() {
      Route.open('bulk/users')().search({ next: ctrl.action.task })
    }
  }
})()
