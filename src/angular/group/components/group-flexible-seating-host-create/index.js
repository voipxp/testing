import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.group').component('groupFlexibleSeatingHostCreate', {
  template,
  controller,
  bindings: {
    groupId: '<',
    serviceProviderId: '<',
    onUpdate: '&',
    onCreate: '&'
  }
})

controller.$inject = [
  'Alert',
  'HashService',
  '$scope',
  'EventEmitter',
  'GroupFlexibleSeatingHostService',
  'Module'
]
function controller(
  Alert,
  HashService,
  $scope,
  EventEmitter,
  GroupFlexibleSeatingHostService,
  Module
) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.options = GroupFlexibleSeatingHostService.options
  ctrl.onSelectPhone = onSelectPhone
  ctrl.onSelectUserId = onSelectUserId
  ctrl.flexibleSeatingHost = {}

  function onInit() {
    Module.show('Flexible Seating Host').then(function(module) {
      ctrl.module = module
    })
    ctrl.modalId = HashService.guid()
  }

  function open() {
    ctrl.flexibleSeatingHost = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    Alert.modal.open(ctrl.modalId, function(close) {
      create(ctrl.flexibleSeatingHost, close)
    })
  }

  function create(flexibleSeatingHost, callback) {
    Alert.spinner.open()
    GroupFlexibleSeatingHostService.store(flexibleSeatingHost)
      .then(function() {
        Alert.notify.success('Flexible Seating Host Created')
        callback()
        sendUpdate(flexibleSeatingHost)
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function onSelectPhone(event) {
    _.set(ctrl.flexibleSeatingHost, 'serviceInstanceProfile.phoneNumber', event.phoneNumber)
  }

  function onSelectUserId(event) {
    ctrl.flexibleSeatingHost.serviceUserId = event.userId
  }

  function sendUpdate(flexibleSeatingHost) {
    return ctrl.onCreate(EventEmitter({ flexibleSeatingHost: flexibleSeatingHost }))
  }

  $scope.$on('flexibleSeatingHostCreate:load', open)
}
