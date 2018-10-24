;(function() {
  angular
    .module('odin.user')
    .component('userOutgoingCallingPlanTransferNumbers', {
      templateUrl:
        'user/components/callingPlans/transferNumbers/transferNumbers.component.html',
      controller: Controller,
      bindings: { userId: '<' }
    })

  function Controller(Alert, UserOutgoingCallingPlanTransferNumbersService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanTransferNumbersService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
      })
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open(
        'editUserOutgoingCallingPlanTransferNumber',
        function onSave(close) {
          update(ctrl.editPlan, close)
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanTransferNumbersService.update(ctrl.userId, plan)
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('Department Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
