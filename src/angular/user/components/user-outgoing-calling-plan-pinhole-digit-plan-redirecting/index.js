import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userOutgoingCallingPlanPinholeDigitPlanRedirecting', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserOutgoingCallingPlanPinholeDigitPlanRedirectingService']
function controller(Alert, UserOutgoingCallingPlanPinholeDigitPlanRedirectingService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserOutgoingCallingPlanPinholeDigitPlanRedirectingService.options

  function onInit() {
    ctrl.loading = true
    loadPlan()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return UserOutgoingCallingPlanPinholeDigitPlanRedirectingService.show(ctrl.userId).then(
      function(data) {
        ctrl.plan = data
      }
    )
  }

  function edit() {
    ctrl.editPlan = angular.copy(ctrl.plan)
    Alert.modal.open('editUserOutgoingCallingPlanPinholeDigitPlanRedirecting', function onSave(
      close
    ) {
      update(ctrl.editPlan, close)
    })
  }

  function update(plan, callback) {
    Alert.spinner.open()
    UserOutgoingCallingPlanPinholeDigitPlanRedirectingService.update(ctrl.userId, plan)
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('Redirecting Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
