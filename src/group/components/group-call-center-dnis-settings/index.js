import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupCallCenterDnisSettings', {
  template,
  controller,
  bindings: {
    serviceUserId: '<',
    dnisId: '<',
    serviceProviderId: '<',
    groupId: '<',
    onUpdate: '&',
    onDelete: '&'
  }
})

controller.$inject = [
  'Alert',
  'GroupCallCenterDnisInstanceService',
  'EventEmitter'
]
function controller(Alert, GroupCallCenterDnisInstanceService, EventEmitter) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.selectNumber = selectNumber
  ctrl.setExtension = setExtension
  ctrl.options = GroupCallCenterDnisInstanceService.options

  function onInit() {
    ctrl.loading = true
    loadDnis()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadDnis() {
    return GroupCallCenterDnisInstanceService.show(
      ctrl.serviceUserId,
      ctrl.dnisId
    ).then(function(data) {
      ctrl.service = data
      ctrl.service.name = ctrl.dnisId
      return data
    })
  }

  function selectNumber(event) {
    ctrl.editService.dnisPhoneNumber = event.phoneNumber
    setExtension()
  }

  function edit() {
    ctrl.editService = angular.copy(ctrl.service)
    ctrl.editService.newDNISName = ctrl.service.name
    Alert.modal.open(
      'editGroupCallCenterDnisInstance',
      function(close) {
        update(ctrl.editService, close)
      },
      function(close) {
        Alert.confirm
          .open('Are you sure you want to delete this DNIS?')
          .then(function() {
            destroy(ctrl.editService, close)
          })
      }
    )
  }

  function update(dnis, callback) {
    Alert.spinner.open()
    GroupCallCenterDnisInstanceService.update(
      ctrl.serviceUserId,
      ctrl.dnisId,
      dnis
    )
      .then(loadDnis)
      .then(function() {
        Alert.notify.success('DNIS Instance Updated')
        callback()
        ctrl.onUpdate(EventEmitter({ dnis: dnis }))
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function setExtension() {
    ctrl.editService.extension = ctrl.editService.dnisPhoneNumber
      ? ctrl.editService.dnisPhoneNumber.slice(-4)
      : null
  }

  function destroy(dnis, callback) {
    Alert.spinner.open()
    GroupCallCenterDnisInstanceService.destroy(ctrl.serviceUserId, ctrl.dnisId)
      .then(function() {
        Alert.notify.success('DNIS Instance Removed')
        callback()
        ctrl.onDelete(EventEmitter({ dnis: dnis }))
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
