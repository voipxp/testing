import angular from 'angular'
import template from './index.html'

angular
  .module('odin.user')
  .component('userOutgoingCallingPlanPinholeDigitPlanCallMeNow', {
    template,
    controller,
    bindings: { userId: '<' }
  })

controller.$inject = [
  'Alert',
  'UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService'
]
function controller(
  Alert,
  UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.edit = edit
  ctrl.options = UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService.options

  function onInit() {
    ctrl.loading = true
    loadPlan()
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadPlan() {
    return UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService.show(
      ctrl.userId
    ).then(function(data) {
      ctrl.plan = data
    })
  }

  function edit() {
    ctrl.editPlan = angular.copy(ctrl.plan)
    Alert.modal.open(
      'editUserOutgoingCallingPlanPinholeDigitPlanCallMeNow',
      function onSave(close) {
        update(ctrl.editPlan, close)
      }
    )
  }

  function update(plan, callback) {
    Alert.spinner.open()
    UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService.update(
      ctrl.userId,
      plan
    )
      .then(loadPlan)
      .then(function() {
        Alert.notify.success('CallMeNow Updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }
}
