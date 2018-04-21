;(function() {
  angular.module('odin.common').component('userCallPolicies', {
    templateUrl:
      'common/components/userCallPolicies/userCallPolicies.component.html',
    controller: Controller,
    bindings: { userId: '=', readOnly: '<' }
  })

  function Controller(Alert, UserCallPoliciesService, $scope) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.$onInit = activate
    ctrl.options = UserCallPoliciesService.options

    function activate() {
      ctrl.passcode = {}
      ctrl.loading = true
      loadPolicies()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPolicies() {
      return UserCallPoliciesService.show(ctrl.userId).then(function(data) {
        console.log('policies', data)
        ctrl.policies = data
        return data
      })
    }

    function update(policies, callback) {
      Alert.spinner.open()
      UserCallPoliciesService.update(ctrl.userId, policies)
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
})()
