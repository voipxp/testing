import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkTasksIndex', {
  template,
  controller
})

controller.$inject = ['Route']
function controller(Route) {
  var ctrl = this
  ctrl.open = open

  function open(task) {
    Route.open('/bulk/tasks', task && task.id)
  }
}
