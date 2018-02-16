;(function() {
  angular.module('odin.user').component('userOutgoingCallingPlanOriginating', {
    templateUrl:
      'user/components/callingPlans/outgoing/originating.component.html',
    bindings: { userId: '<' },
    controller: Controller
  })

  function Controller(Alert, UserOutgoingCallingPlanOriginatingService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanOriginatingService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanOriginatingService.show(ctrl.userId).then(
        function(data) {
          console.log('plan', data)
          ctrl.plan = data
        }
      )
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open(
        'editUserOutgoingCallingPlanOriginating',
        function onSave(close) {
          update(ctrl.editPlan, close)
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanOriginatingService.update(ctrl.userId, plan)
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
