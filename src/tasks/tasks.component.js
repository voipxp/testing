;(function() {
  angular.module('odin.tasks').component('odinTasks', {
    templateUrl: 'tasks/tasks.component.html',
    controller: Controller
  })

  function Controller(TaskService, Alert) {
    var ctrl = this
    ctrl.open = open
    ctrl.refresh = activate
    ctrl.$onInit = activate
    ctrl.recent = 50

    function activate() {
      ctrl.loading = true
      TaskService.index(ctrl.recent)
        .then(function(data) {
          ctrl.tasks = data
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function open(task) {
      ctrl.task = task
      Alert.modal.open('showOdinTask')
      // PR.prettyPrint()
    }
  }
})()
