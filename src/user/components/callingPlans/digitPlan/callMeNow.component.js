;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanDigitPlanCallMeNow', {
      templateUrl:
        'user/components/callingPlans/digitPlan/callMeNow.component.html',
      controller: Controller,
      bindings: { userId: '<' }
    })

  function Controller(Alert, UserOutgoingCallingPlanDigitPlanCallMeNowService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanDigitPlanCallMeNowService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanDigitPlanCallMeNowService.show(
        ctrl.userId
      ).then(function(data) {
        console.log('plan', data)
        ctrl.plan = data
      })
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open(
        'editUserOutgoingCallingPlanDigitPlanCallMeNow',
        function onSave(close) {
          update(ctrl.editPlan, close)
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanDigitPlanCallMeNowService.update(ctrl.userId, plan)
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('CallMeNow Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
