/*
  Make on the fly and select those numbers
    OR
  Generate a user.phoneNumber.create task?
*/
import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.bulk').component('bulkCreateNumbers', {
  template,
  controller,
  bindings: {
    serviceProviderId: '<',
    groupId: '<',
    userCount: '<',
    onUpdate: '&'
  }
})

controller.$inject = [
  'Alert',
  'ServiceProviderNumberService',
  'GroupNumberService',
  'NumberService',
  '$scope',
  'EventEmitter',
  'HashService',
  '$q'
]
function controller(
  Alert,
  ServiceProviderNumberService,
  GroupNumberService,
  NumberService,
  $scope,
  EventEmitter,
  HashService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.validateNumber = NumberService.regex
  ctrl.generateRange = generateRange

  function onInit() {
    ctrl.modalId = HashService.guid()
    ctrl.number = {}
  }

  function generateRange() {
    if (!ctrl.number.min) return
    var min = ctrl.number.min.replace(/[^\d]/g, '')
    if (min.length < 10 || min.length > 15) {
      ctrl.number.max = null
      return
    }
    ctrl.numbers = NumberService.generate(min, ctrl.userCount)
    ctrl.number.max = ctrl.numbers[ctrl.userCount - 1].min
  }

  function open() {
    Alert.modal.open(ctrl.modalId, function(close) {
      createRange(ctrl.numbers, close)
    })
  }

  function createRange(numbers, callback) {
    Alert.spinner.open()
    assignServiceProvider(numbers)
      .then(() => assignGroup(numbers))
      .then(() => validateAssignment(numbers))
      .then(function() {
        sendUpdate(numbers, callback)
      })
      .catch(function(error) {
        Alert.notify.danger(error.data || error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function loadAvailable() {
    return GroupNumberService.index(
      ctrl.serviceProviderId,
      ctrl.groupId,
      'available'
    )
  }

  function assignServiceProvider(numbers) {
    return ServiceProviderNumberService.store(
      ctrl.serviceProviderId,
      numbers
    ).catch(function() {
      return numbers
    })
  }

  function assignGroup(numbers) {
    return GroupNumberService.assign(
      ctrl.serviceProviderId,
      ctrl.groupId,
      numbers
    ).catch(function() {
      return numbers
    })
  }

  function validateAssignment(numbers) {
    return $q(function(resolve, reject) {
      return loadAvailable().then(function(data) {
        var result = _.every(numbers, function(number) {
          return _.find(data, { min: number.min })
        })
        if (!result) return reject('Unable to Assign Numbers')
        resolve(numbers)
      })
    })
  }

  function sendUpdate(numbers, callback) {
    ctrl.onUpdate(EventEmitter({ phoneNumbers: _.map(numbers, 'min') }))
    callback()
  }

  $scope.$on('bulkCreateNumbers:load', open)
}
