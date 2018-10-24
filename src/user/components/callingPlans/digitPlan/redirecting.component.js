;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanDigitPlanRedirecting', {
      templateUrl:
        'user/components/callingPlans/digitPlan/redirecting.component.html',
      controller: Controller,
      bindings: { userId: '<' }
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanDigitPlanRedirectingService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanDigitPlanRedirectingService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanDigitPlanRedirectingService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
      })
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open(
        'editUserOutgoingCallingPlanDigitPlanRedirecting',
        function onSave(close) {
          update(ctrl.editPlan, close)
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanDigitPlanRedirectingService.update(
        ctrl.userId,
        plan
      )
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('Redirecting Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
