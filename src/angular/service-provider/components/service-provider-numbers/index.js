import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderNumbers', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderNumberService',
  'NumberService',
  'ACL'
]
function controller(Alert, ServiceProviderNumberService, NumberService, ACL) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.add = add
  ctrl.edit = edit
  ctrl.remove = remove
  ctrl.bulk = bulk

  function onInit() {
    ctrl.loading = true
    ctrl.canUpdate = ACL.has('Provisioning')
    return loadNumbers()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadNumbers() {
    return ServiceProviderNumberService.index(ctrl.serviceProviderId).then(
      function(data) {
        ctrl.numbers = _.map(data.dns, function(number) {
          number.expanded = _.map(NumberService.expand(number), 'min')
          return number
        })
      }
    )
  }

  function add() {
    if (!ctrl.canUpdate) return
    ctrl.newNumber = {}
    Alert.modal.open('serviceProviderNumbersCreateModal', function(close) {
      create(ctrl.newNumber, close)
    })
  }

  function edit(number) {
    if (!ctrl.canUpdate || number.groupId) return
    ctrl.editNumbers = {
      available: [],
      selected: NumberService.expand(number)
    }
    Alert.modal.open('serviceProviderNumbersEditModal', function(close) {
      if (ctrl.editNumbers.available.length === 0) return close()
      remove(ctrl.editNumbers.available, close)
    })
  }

  function create(number, callback) {
    Alert.spinner.open()
    ServiceProviderNumberService.store(ctrl.serviceProviderId, [number])
      .then(loadNumbers)
      .then(function() {
        Alert.notify.success('Number Added')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function remove(numbers, callback) {
    Alert.spinner.open()
    ServiceProviderNumberService.destroy(ctrl.serviceProviderId, numbers)
      .then(loadNumbers)
      .then(function() {
        Alert.notify.success('Number Removed')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function bulk() {
    Alert.modal.open('serviceProviderNumbersBulkModal', function onSave(close) {
      bulkAssignNumbers(ctrl.bulkNumbers, close)
    })
  }
  function bulkAssignNumbers(bulkNumbers, callback) {
    Alert.spinner.open()
    var numbers = bulkNumbers.split('\n')
    var dns = _.map(numbers, function(number) {
      if (number.includes(' - ')) {
        var [min, max] = number.split(' - ')
        return {
          min: min.trim(),
          max: max.trim()
        }
      } else {
        return {
          min: number
        }
      }
    })
    return ServiceProviderNumberService.store(ctrl.serviceProviderId, dns)
      .then(loadNumbers)
      .then(function() {
        ctrl.filter = {}
        Alert.notify.success('Bulk Assigned Numbers ')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
