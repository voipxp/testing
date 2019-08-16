import angular from 'angular'
import template from './index.html'

angular.module('odin.user').component('userOutgoingCallingPlanDigitPlanOriginating', {
  template,
  controller,
  bindings: { userId: '<' }
})

controller.$inject = ['Alert', 'UserOutgoingCallingPlanDigitPlanOriginatingService']
function controller(Alert, UserOutgoingCallingPlanDigitPlanOriginatingService) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserOutgoingCallingPlanDigitPlanOriginatingService.options

  function onInit() {
    ctrl.loading = true
    loadPlan()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return UserOutgoingCallingPlanDigitPlanOriginatingService.show(ctrl.userId).then(function(
      data
    ) {
      ctrl.plan = data
    })
  }

  function edit() {
    ctrl.editPlan = angular.copy(ctrl.plan)
    Alert.modal.open('editUserOutgoingCallingPlanDigitPlanOriginating', function onSave(close) {
      update(ctrl.editPlan, close)
    })
  }

  function update(plan, callback) {
    Alert.spinner.open()
    UserOutgoingCallingPlanDigitPlanOriginatingService.update(ctrl.userId, plan)
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('Originating Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
