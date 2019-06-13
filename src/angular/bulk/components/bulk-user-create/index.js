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
        serviceProviderId: ctrl.data.serviceProviderId,
        groupId: ctrl.data.groupId,
        userId: ctrl.data.userId,
        firstName: ctrl.data.firstName,
        lastName: ctrl.data.lastName,
        callingLineIdFirstName: ctrl.data.callingLineIdFirstName,
        callingLineIdLastName: ctrl.data.callingLineIdLastName,
        password: ctrl.data.password,
        passcode: ctrl.data.passcode,
        phoneNumber: _.get(ctrl.data, 'phoneNumbers.' + i),
        extension: ctrl.data.extension,
        callingLineIdPhoneNumber: ctrl.data.callingLineIdPhoneNumber,
        timeZone: ctrl.data.timeZone,
        language: ctrl.data.language,
        networkClassOfService: ctrl.data.networkClassOfService,
        mobilePhoneNumber: ctrl.data.mobilePhoneNumber,
        pagerPhoneNumber: ctrl.data.pagerPhoneNumber,
        emailAddress: ctrl.data.emailAddress,
        addressLocation: ctrl.data.addressLocation,
        department: ctrl.data.department || {},
        address: ctrl.data.address,
        endpointType: ctrl.data.endpointType,
        domain: ctrl.data.domain
      }
      // make strings so they are editable in review page
      if (ctrl.data.activatePhoneNumber) {
        task.activatePhoneNumber = 'true'
      } else if (ctrl.data.activatePhoneNumber === false) {
        task.activatePhoneNumber = 'false'
      }
      if (task.endpointType === 'accessDeviceEndpoint') {
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
    // console.log(JSON.stringify(ctrl.data, null, 2))
    ctrl.wizard.next()
  }
}
