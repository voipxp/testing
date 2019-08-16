import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterDnis', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', serviceUserId: '<' }
})

controller.$inject = ['GroupCallCenterDnisService', 'GroupCallCenterDnisInstanceService', 'Alert']
function controller(GroupCallCenterDnisService, GroupCallCenterDnisInstanceService, Alert) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.open = open
  ctrl.add = add
  ctrl.setExtension = setExtension
  ctrl.options = GroupCallCenterDnisService.options
  ctrl.instanceOptions = GroupCallCenterDnisInstanceService.options
  ctrl.onUpdate = onUpdate
  ctrl.onDelete = onDelete
  ctrl.selectNumber = selectNumber

  function onInit() {
    ctrl.loading = true
    loadService()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadService() {
    return GroupCallCenterDnisService.show(ctrl.serviceUserId).then(function(data) {
      ctrl.service = data
    })
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    Alert.modal.open('editGroupCallCenterDNIS', function onSave(close) {
      update(ctrl.editService, close)
    })
  }

  function add() {
    ctrl.newService = {
      serviceUserId: ctrl.serviceUserId,
      name: null,
      priority: null,
      dnisPhoneNumber: null,
      extension: null,
      callingLineIdPhoneNumber: null,
      useCustomCLIDSettings: false,
      callingLineIdLastName: null,
      callingLineIdFirstName: null,
      useCustomDnisAnnouncementSettings: false,
      allowOutgoingACDCall: false
    }
    Alert.modal.open('newGroupCallCenterDnisInstance', function(close) {
      create(ctrl.newService, close)
    })
  }

  function selectNumber(event) {
    ctrl.newService.dnisPhoneNumber = event.phoneNumber
    setExtension(event.phoneNumber)
    setCLID(event.phoneNumber)
  }

  function setExtension(number) {
    ctrl.newService.extension = number ? number.slice(-4) : null
  }

  function setCLID(number) {
    ctrl.newService.callingLineIdPhoneNumber = number
  }

  function open(dnis) {
    ctrl.dnisId = dnis.name
  }

  function onUpdate(event) {
    ctrl.dnisId = null
    ctrl.dnisId = event.dnis.newDNISName || event.dnis.name
    onInit()
  }

  function onDelete() {
    ctrl.dnisId = null
    onInit()
  }

  function update(service, callback) {
    Alert.spinner.open()
    GroupCallCenterDnisService.update(ctrl.serviceUserId, service)
      .then(loadService)
      .then(function() {
        Alert.notify.success('DNIS Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function create(service, callback) {
    Alert.spinner.open()
    GroupCallCenterDnisInstanceService.store(ctrl.serviceUserId, service)
      .then(function() {
        Alert.notify.success('DNIS Created')
        callback()
        open(service)
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
