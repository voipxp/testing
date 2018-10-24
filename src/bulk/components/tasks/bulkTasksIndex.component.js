;(function() {
  angular.module('odin.bulk').component('bulkTasksIndex', {
    templateUrl: 'bulk/components/tasks/bulkTasksIndex.component.html',
    controller: Controller
  })

  function Controller(Route) {
    var ctrl = this
    ctrl.open = open

    function open(task) {
      Route.open('/bulk/tasks', task && task.id)
    }
  }
})()
