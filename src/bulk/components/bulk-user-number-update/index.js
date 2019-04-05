import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserNumberUpdate', {
  template,
  controller,
  bindings: { data: '<' }
})

controller.$inject = ['BulkImportService']
function controller(BulkImportService) {
  var ctrl = this
  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete
  ctrl.onUpdate = onUpdate
  ctrl.next = next

  ctrl.task = 'user.number.update'

  ctrl.$onInit = function() {
    ctrl.changeUserId = false
  }

  function wizardReady(event) {
    ctrl.wizard = event.wizard
  }

  function wizardComplete() {
    var data = prepareImport()
    BulkImportService.open(data)
  }

  function prepareImport() {
    var jobs = []
    for (var i = 0; i < ctrl.data.users.length; i++) {
      var user = ctrl.data.users[i]
      var job = {
        task: 'user.number.update',
        serviceProviderId: user.serviceProviderId,
        groupId: user.groupId,
        userId: user.userId,
        domain: user.domain,
        phoneNumber: _.get(ctrl.data, 'phoneNumbers.' + i),
        activatePhoneNumber: ctrl.activatePhoneNumber,
        extension: ctrl.data.extension,
        callingLineIdPhoneNumber: ctrl.data.callingLineIdPhoneNumber
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

  // generic assignment
  function onUpdate(event) {
    _.assign(ctrl.data, event)
    next()
  }

  function next() {
    // console.log(JSON.stringify(ctrl.data, null, 2))
    ctrl.wizard.next()
  }
}