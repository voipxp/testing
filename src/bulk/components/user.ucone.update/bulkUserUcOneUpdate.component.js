;(function() {
  angular.module('odin.bulk').component('bulkUserUcOneUpdate', {
    templateUrl:
      'bulk/components/user.ucone.update/bulkUserUcOneUpdate.component.html',
    controller: Controller,
    bindings: { data: '<' }
  })

  function Controller(Alert, BulkImportService) {
    var ctrl = this
    ctrl.wizardReady = wizardReady
    ctrl.wizardComplete = wizardComplete
    ctrl.onUpdate = onUpdate

    ctrl.task = 'user.ucone.update'

    function wizardReady(event) {
      ctrl.wizard = event.wizard
    }

    function wizardComplete() {
      var data = prepareImport()
      BulkImportService.open(data)
    }

    function prepareImport() {
      var tasks = []
      for (var i = 0; i < ctrl.data.users.length; i++) {
        var user = ctrl.data.users[i]
        var task = {
          task: 'user.ucone.update',
          serviceProviderId: user.serviceProviderId,
          groupId: user.groupId,
          userId: user.userId,
          domain: user.domain,
          phoneNumber: user.phoneNumber,
          extension: user.extension,
          userServices: ctrl.data.userServices,
          servicePackServices: ctrl.data.servicePackServices,
          settings: ctrl.data.settings,
          endpoints: ctrl.data.endpoints
        }
        tasks.push(task)
      }
      return tasks
    }

    // generic assignment
    function onUpdate(event) {
      _.assign(ctrl.data, event)
      next()
    }

    function next() {
      console.log(JSON.stringify(ctrl.data, null, 2))
      ctrl.wizard.next()
    }
  }
})()
