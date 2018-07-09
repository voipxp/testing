;(function() {
  angular.module('odin.bulk').component('bulkTasksIndex', {
    templateUrl: 'bulk/components/tasks/bulkTasksIndex.component.html',
    controller: Controller
  })

  function Controller(Route) {
    var ctrl = this
    var route = Route.open('/bulk/tasks')
    ctrl.open = open

    function open(task) {
      console.log('open', task)
      route(task && task.id)
    }
  }
})()
