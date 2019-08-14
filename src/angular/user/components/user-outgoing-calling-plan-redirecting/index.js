import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userOutgoingCallingPlanRedirecting', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserOutgoingCallingPlanRedirectingService']
function controller(Alert, UserOutgoingCallingPlanRedirectingService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserOutgoingCallingPlanRedirectingService.options

  function onInit() {
    ctrl.loading = true
    loadPlan()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return UserOutgoingCallingPlanRedirectingService.show(ctrl.userId).then(function(data) {
      ctrl.plan = data
    })
  }

  function edit() {
    ctrl.editPlan = angular.copy(ctrl.plan)
    Alert.modal.open('editUserOutgoingCallingPlanRedirecting', function onSave(close) {
      update(ctrl.editPlan, close)
    })
  }

  function update(plan, callback) {
    Alert.spinner.open()
    UserOutgoingCallingPlanRedirectingService.update(ctrl.userId, plan)
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('Redirecting Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
