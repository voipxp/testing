import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userIncomingCallingPlan', {
  template,
  controller,
  bindings: { userId: '<', readOnly: '<' }
})

controller.$inject = ['Alert', 'UserIncomingCallingPlanService']
function controller(Alert, UserIncomingCallingPlanService) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserIncomingCallingPlanService.options

  function onInit() {
    ctrl.loading = true
    loadPlan()
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return UserIncomingCallingPlanService.show(ctrl.userId).then(function(data) {
      ctrl.plan = data
      return data
    })
  }

  function update(plan, callback) {
    Alert.spinner.open()
    UserIncomingCallingPlanService.update(ctrl.userId, plan)
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('Incoming Calling Plan Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function edit() {
    ctrl.editPlan = angular.copy(ctrl.plan)
    Alert.modal.open('editUserIncomingPlan', function(close) {
      update(ctrl.editPlan, close)
    })
  }
}
