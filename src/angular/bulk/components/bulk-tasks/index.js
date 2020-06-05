import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkTasks', {
  template,
  controller,
  bindings: {
    limit: '<'
  }
})

controller.$inject = ['TaskService', 'Alert', 'Route', '$timeout', '$location']
function controller(TaskService, Alert, Route, $timeout, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onDestroy = stopReload
  ctrl.open = open
  ctrl.errors = errors
  ctrl.searchStatus = {}

  var defaultLimit = 50
  var reload

  function onInit() {
    ctrl.loading = true
    loadTasks()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function startReload() {
    reload = $timeout(loadTasks, 5000)
  }

  function stopReload() {
    if (reload) $timeout.cancel(reload)
  }

  function loadTasks() {
    return TaskService.index(ctrl.limit || defaultLimit, null)
      .then(function(data) {
        ctrl.tasks = data
        return data
      })
      .then(startReload)
  }

  function errors(task) {
    var users = (task && task.data) || []
    var status = { failed: 0, errors: 0 }
    users.forEach(function(user) {
      if (user.status === 'failed') {
        status.failed += 1
      } else if (user.status === 'completed' && user.error) {
        status.errors += 1
      }
    })
    var messages = []
    if (status.failed > 0) {
      messages.push(status.failed + ' Failed')
    }
    if (status.errors > 0) {
      messages.push(status.errors + ' Errors')
    }
    return messages.join(', ') || task.error
  }

  function open(task) {
    var currentUrl = $location.path()
    $location.path(currentUrl + '/' + task.id).replace()
  }
}
