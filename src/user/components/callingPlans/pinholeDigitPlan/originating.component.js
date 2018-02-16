;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanPinholeDigitPlanOriginating', {
      templateUrl:
        'user/components/callingPlans/pinholeDigitPlan/originating.component.html',
      controller: Controller,
      bindings: { userId: '<' }
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanPinholeDigitPlanOriginatingService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options =
      UserOutgoingCallingPlanPinholeDigitPlanOriginatingService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanPinholeDigitPlanOriginatingService.show(
        ctrl.userId
      ).then(function(data) {
        console.log('plan', data)
        ctrl.plan = data
      })
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open(
        'editUserOutgoingCallingPlanPinholeDigitPlanOriginating',
        function onSave(close) {
          update(ctrl.editPlan, close)
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanPinholeDigitPlanOriginatingService.update(
        ctrl.userId,
        plan
      )
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('Originating Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
