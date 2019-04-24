import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupOutgoingCallingPlanPinholeDigitPatterns', {
    template,
    controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = [
  'Alert',
  'GroupOutgoingCallingPlanPinholeDigitPatternService',
  '$scope'
]
function controller(
  Alert,
  GroupOutgoingCallingPlanPinholeDigitPatternService,
  $scope
) {
  var ctrl = this
  ctrl.$onInit = activate
  ctrl.add = add
  ctrl.edit = edit
  ctrl.remove = remove

  function activate() {
    ctrl.loading = true
    loadPatterns()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPatterns() {
    return GroupOutgoingCallingPlanPinholeDigitPatternService.index(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.patterns = data
      return data
    })
  }

  function edit(pattern) {
    ctrl.editPattern = angular.copy(pattern)
    Alert.modal.open(
      'editOutgoingCallingPlanPinholeDigitPattern',
      function onSave(close) {
        update(ctrl.editPattern, close)
      },
      function onDelete(close) {
        remove(ctrl.editPattern, close)
      }
    )
  }

  function add() {
    ctrl.addPattern = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId
    }
    if ($scope.addOutgoingCallingPlanPinholeDigitPatternForm) {
      $scope.addOutgoingCallingPlanPinholeDigitPatternForm.$setPristine()
    }
    Alert.modal.open(
      'addOutgoingCallingPlanPinholeDigitPattern',
      function onSave(close) {
        create(ctrl.addPattern, close)
      }
    )
  }

  function create(pattern, callback) {
    Alert.spinner.open()
    GroupOutgoingCallingPlanPinholeDigitPatternService.store(
      ctrl.serviceProviderId,
      ctrl.groupId,
      pattern
    )
      .then(loadPatterns)
      .then(function() {
        Alert.notify.success('Pinhole Digit Pattern Created')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function update(pattern, callback) {
    Alert.spinner.open()
    GroupOutgoingCallingPlanPinholeDigitPatternService.update(
      ctrl.serviceProviderId,
      ctrl.groupId,
      pattern
    )
      .then(loadPatterns)
      .then(function() {
        Alert.notify.success('Pinhole Digit Pattern Updated')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function remove(pattern, callback) {
    Alert.confirm
      .open('Are you sure you want to delete ' + pattern.name + '?')
      .then(function() {
        Alert.spinner.open()
        GroupOutgoingCallingPlanPinholeDigitPatternService.destroy(
          ctrl.serviceProviderId,
          ctrl.groupId,
          pattern.name
        )
          .then(loadPatterns)
          .then(function() {
            Alert.notify.success('Pinhole Digit Pattern Removed')
            if (_.isFunction(callback)) {
              callback()
            }
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
  }
}
