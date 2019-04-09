import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.common').component('userCallPolicies', {
  template,
  controller,
  bindings: { userId: '=', readOnly: '<' }
})

controller.$inject = ['Alert', 'UserCallPoliciesService', '$scope']
function controller(Alert, UserCallPoliciesService, $scope) {
  var ctrl = this
  ctrl.edit = edit
  ctrl.$onInit = activate
  ctrl.options = UserCallPoliciesService.options

  function activate() {
    ctrl.loading = true
    loadPolicies()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPolicies() {
    return UserCallPoliciesService.show(ctrl.userId).then(function(data) {
      ctrl.policies = data
      return data
    })
  }

  function update(policies, callback) {
    Alert.spinner.open()
    UserCallPoliciesService.update(policies)
      .then(loadPolicies)
      .then(function() {
        ctrl.editPolicies = {}
        Alert.notify.success('Call Policies Updated')
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

  function edit() {
    if ($scope.editUserCallPoliciesForm) {
      $scope.editUserCallPoliciesForm.$setPristine()
    }
    ctrl.editPolicies = angular.copy(ctrl.policies)
    Alert.modal.open('editUserCallPolicies', function(close) {
      update(ctrl.editPolicies, close)
    })
  }
}
