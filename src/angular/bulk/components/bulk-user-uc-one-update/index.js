import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserUcOneUpdate', {
  template,
  controller
})

controller.$inject = ['BulkImportService', '$window']
function controller(BulkImportService, $window) {
  var ctrl = this
  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete
  ctrl.onUpdate = onUpdate
  ctrl.goBack = goBack
  ctrl.onSelectUsers = onSelectUsers
  ctrl.data = { users: [] }

  function onSelectUsers(event) {
    ctrl.data = event
  }

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
    Object.assign(ctrl.data, event)
    next()
  }

  function next() {
    ctrl.wizard.next()
  }

  function goBack() {
    $window.history.back()
  }
}
