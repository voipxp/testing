import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkUserCreate', {
  template,
  controller
})

controller.$inject = ['BulkImportService', '$location']
function controller(BulkImportService, $location) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.wizardReady = wizardReady
  ctrl.wizardComplete = wizardComplete

  ctrl.onUpdateServiceProviderId = onUpdateServiceProviderId
  ctrl.onUpdateGroupId = onUpdateGroupId
  ctrl.onUpdate = onUpdate

  function onInit() {
    ctrl.data = {}
    var params = $location.search()
    ctrl.data.serviceProviderId = params.serviceProviderId
    ctrl.data.groupId = params.groupId
    ctrl.data.userCount = parseInt(params.userCount, 10) || 0
  }

  function wizardReady(event) {
    ctrl.wizard = event.wizard
    if (ctrl.data.serviceProviderId) next()
    if (ctrl.data.groupId) next()
    if (ctrl.data.userCount && ctrl.data.userCount > 0) next()
  }

  function wizardComplete() {
    var data = prepareImport()
    BulkImportService.open(data)
  }

  function prepareImport() {
    var tasks = []
    for (var i = 0; i < ctrl.data.userCount; i++) {
      var task = {
        task: 'user.create',
        serviceProviderId: ctrl.data.serviceProviderId || null,
        groupId: ctrl.data.groupId || null,
        userId: ctrl.data.userId || null,
        firstName: ctrl.data.firstName || null,
        lastName: ctrl.data.lastName || null,
        callingLineIdFirstName: ctrl.data.callingLineIdFirstName || null,
        callingLineIdLastName: ctrl.data.callingLineIdLastName || null,
        password: ctrl.data.password || '__CHANGEME__',
        passcode: ctrl.data.passcode || '',
        phoneNumber: _.get(ctrl.data, 'phoneNumbers.' + i, null),
        extension: ctrl.data.extension || null,
        callingLineIdPhoneNumber: ctrl.data.callingLineIdPhoneNumber || null,
        timeZone: ctrl.data.timeZone || null,
        language: ctrl.data.language || null,
        networkClassOfService: ctrl.data.networkClassOfService || null,
        mobilePhoneNumber: ctrl.data.mobilePhoneNumber || null,
        pagerPhoneNumber: ctrl.data.pagerPhoneNumber || null,
        emailAddress: ctrl.data.emailAddress || null,
        addressLocation: ctrl.data.addressLocation || null,
        department: _.isEmpty(ctrl.data.department) ? null : ctrl.data.department,
        address: ctrl.data.address,
        endpointType: ctrl.data.endpointType || null,
        domain: ctrl.data.domain || null
      }

      // make strings so they are editable in review page
      if (ctrl.data.activatePhoneNumber) {
        task.activatePhoneNumber = 'true'
      } else if (ctrl.data.activatePhoneNumber === false) {
        task.activatePhoneNumber = 'false'
      }

      if (task.endpointType === 'accessDeviceEndpoint') {
        task.allowAccessDeviceUpdate = ctrl.data.allowAccessDeviceUpdate ? 'true' : 'false'
        task.accessDeviceEndpoint = ctrl.data.accessDeviceEndpoint
      } else if (task.endpointType === 'trunkAddressing') {
        task.trunkAddressing = ctrl.data.trunkAddressing
      }

      tasks.push(task)
    }
    return tasks
  }

  function onUpdateServiceProviderId(event) {
    // reset groupId and userCount if changed
    if (event.serviceProviderId !== ctrl.data.serviceProviderId) {
      ctrl.data.groupId = null
      ctrl.data.userCount = 0
    }
    ctrl.data.serviceProviderId = event.serviceProviderId
    next()
  }

  function onUpdateGroupId(event) {
    // reset userCount if changed
    if (event.groupId !== ctrl.data.groupId) {
      ctrl.data.userCount = 0
    }
    ctrl.data.groupId = event.groupId
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
