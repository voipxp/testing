import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkSelectNumbers', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    userCount: '<',
    phoneNumbers: '<',
    extension: '<',
    activatePhoneNumber: '<',
    callingLineIdPhoneNumber: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'GroupExtensionService',
  '$scope',
  'EventEmitter'
]
function controller(Alert, GroupExtensionService, $scope, EventEmitter) {
  var ctrl = this
  ctrl.$onInit = onInit

  ctrl.clearNumbers = clearNumbers
  ctrl.selectNumbers = selectNumbers
  ctrl.createNumbers = createNumbers
  ctrl.onUpdateNumbers = onUpdateNumbers

  ctrl.canComplete = canComplete
  ctrl.complete = complete

  // helpers
  ctrl.templates = { callingLineIdPhoneNumber: '{{ phoneNumber }}' }

  function onInit() {
    if (ctrl.phoneNumbers && ctrl.phoneNumbers.length >= ctrl.userCount) {
      ctrl.phoneNumberAction = 'select'
    } else {
      clearNumbers()
    }
    if (ctrl.activatePhoneNumber === undefined) {
      ctrl.activatePhoneNumber = true
    }
    ctrl.loading = true
    loadExtensions()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadExtensions() {
    return GroupExtensionService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      var min = data.minExtensionLength
      var max = data.maxExtensionLength
      var def = data.defaultExtensionLength
      ctrl.extensions = []
      for (var i = min; i <= max; i++) {
        ctrl.extensions.push({
          default: i === def,
          length: i,
          template: '{{ phoneNumberLast' + i + ' }}'
        })
      }
    })
  }

  function clearNumbers() {
    ctrl.phoneNumbers = []
    ctrl.phoneNumberAction = 'skip'
  }

  function setNumbers(numbers) {
    ctrl.phoneNumbers = numbers
    ctrl.phoneNumberAction = 'select'
    var defaultExtension = _.find(ctrl.extensions, { default: true })
    if (defaultExtension) {
      ctrl.extension = defaultExtension.template
    }
    ctrl.callingLineIdPhoneNumber = ctrl.templates.callingLineIdPhoneNumber
  }

  function selectNumbers() {
    $scope.$broadcast('bulkSelectExistingNumbers:load')
  }

  function createNumbers() {
    $scope.$broadcast('bulkCreateNumbers:load')
  }

  function onUpdateNumbers(event) {
    if (event.phoneNumbers.length >= ctrl.userCount) {
      setNumbers(event.phoneNumbers)
    } else {
      clearNumbers()
    }
  }

  function canComplete() {
    return ctrl.phoneNumberAction === 'select'
      ? ctrl.phoneNumbers.length > 0
      : true
  }

  function complete() {
    ctrl.onUpdate(
      EventEmitter({
        phoneNumbers: ctrl.phoneNumbers,
        activatePhoneNumber: ctrl.activatePhoneNumber,
        extension: ctrl.extension,
        callingLineIdPhoneNumber: ctrl.callingLineIdPhoneNumber
      })
    )
  }
}
