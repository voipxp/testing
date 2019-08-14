import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('selectPhoneNumber', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    phoneNumber: '<',
    showAll: '<',
    allowManual: '<',
    onUpdate: '&'
  }
})

controller.$inject = ['Alert', 'NumberService', 'GroupNumberService', 'EventEmitter', 'HashService']
function controller(Alert, NumberService, GroupNumberService, EventEmitter, HashService) {
  var ctrl = this
  ctrl.numbers = []
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.select = select
  ctrl.updated = updated

  function onInit() {
    ctrl.modalId = HashService.guid()
  }

  function updated() {
    sendUpdate(ctrl.phoneNumber)
  }

  function edit() {
    Alert.spinner.open()
    loadNumbers()
      .then(function() {
        ctrl.search = ''
        Alert.modal.open(ctrl.modalId)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function select(phoneNumber) {
    Alert.modal.close(ctrl.modalId)
    sendUpdate(phoneNumber)
  }

  function sendUpdate(phoneNumber) {
    ctrl.onUpdate(EventEmitter({ phoneNumber: phoneNumber }))
  }

  function loadNumbers() {
    return GroupNumberService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      ctrl.showAll ? 'summary' : 'available'
    ).then(function(data) {
      ctrl.numbers = NumberService.expand(data)
      if (ctrl.phoneNumber) {
        var myNumber = _.find(ctrl.numbers, { min: ctrl.phoneNumber })
        if (!myNumber) {
          ctrl.numbers.push({ min: ctrl.phoneNumber })
        }
      }
      return ctrl.numbers
    })
  }
}
