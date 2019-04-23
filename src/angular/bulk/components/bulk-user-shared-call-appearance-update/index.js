import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserSharedCallAppearanceUpdate', {
  template,
  controller
})

controller.$inject = ['BulkImportService']
function controller(BulkImportService) {
  var ctrl = this
  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete
  ctrl.onUpdate = onUpdate

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
        task: 'user.sharedcallappearance.update',
        serviceProviderId: user.serviceProviderId,
        groupId: user.groupId,
        userId: user.userId,
        phoneNumber: user.phoneNumber,
        lastName: user.lastName,
        firstName: user.firstName,
        extension: user.extension,
        domain: user.domain,
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
}
