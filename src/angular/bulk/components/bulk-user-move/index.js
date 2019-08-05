import angular from 'angular'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserMove', {
  template,
  controller
})

controller.$inject = ['BulkImportService']
function controller(BulkImportService) {
  var ctrl = this
  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete
  ctrl.onUpdate = onUpdate
  ctrl.next = next
  ctrl.changeUserId = false
  ctrl.onSelectUsers = onSelectUsers
  ctrl.data = { users: [] }
  ctrl.destination = {}
  ctrl.onUpdateServiceProviderId = onUpdateServiceProviderId
  ctrl.onUpdateGroupId = onUpdateGroupId
  function onSelectUsers(event) {
    ctrl.data = event
  }

  function wizardReady(event) {
    ctrl.wizard = event.wizard
  }

  function wizardComplete() {
    var data = prepareImport()
    console.log('wizardComplete() data', data)
    BulkImportService.open(data)
  }

  function prepareImport() {
    var jobs = []
    console.log('prepareImport ctrl.data', ctrl.data)
    console.log('prepareImport ctrl.data.users', ctrl.data.users)
    for (var i = 0; i < ctrl.data.users.length; i++) {
      var user = ctrl.data.users[i]
      var job = {
        'task': 'user.move',
        'serviceProviderId': user.serviceProviderId,
        'groupId': user.groupId,
        'userId': user.userId,
        'source.serviceProviderId': user.serviceProviderId,
        'source.groupId': user.groupId,
        'source.userId': user.userId,
        'source.domain': user.domain,
        'destination.serviceProviderId': ctrl.destination.serviceProviderId,
        'destination.groupId': ctrl.destination.groupId,
        'destination.userId': user.userId,
        'destination.password': ctrl.data.password,
        'destination.passcode': ctrl.data.passcode,
        'options': {
          featureAccessCode: true,
          callProcessingPolicy: true,
          networkClassOfService: true,
          extensionLength: true,
          services: true,
          policy: true,
          schedule: true,
          outgoingCallingPlan: true,
          routingProfile: true
        }
      }
      if (ctrl.data.domain) {
        job.domain = ctrl.data.domain
      }
      if (ctrl.data.userId) {
        job.newUserId = ctrl.data.userId
      }
      jobs.push(job)
    }
    return jobs
  }
  function onUpdateServiceProviderId(event) {
    // reset groupId and userCount if changed
    if (event.serviceProviderId !== ctrl.data.serviceProviderId) {
      ctrl.data.groupId = null
      ctrl.data.userCount = 0
    }
    ctrl.data.serviceProviderId = event.serviceProviderId
    ctrl.destination.serviceProviderId = event.serviceProviderId
    next()
  }
  function onUpdateGroupId(event) {
    // reset userCount if changed
    if (event.groupId !== ctrl.data.groupId) {
      ctrl.data.userCount = 0
    }
    ctrl.data.groupId = event.groupId
    ctrl.destination.groupId = event.groupId
    next()
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
