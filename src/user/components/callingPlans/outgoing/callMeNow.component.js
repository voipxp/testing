;(function() {
  angular.module('odin.user').component('userOutgoingCallingPlanCallMeNow', {
    templateUrl:
      'user/components/callingPlans/outgoing/callMeNow.component.html',
    bindings: { userId: '<' },
    controller: Controller
  })

  function Controller(Alert, UserOutgoingCallingPlanCallMeNowService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanCallMeNowService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanCallMeNowService.show(ctrl.userId).then(
        function(data) {
          console.log('plan', data)
          ctrl.plan = data
        }
      )
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open('editUserOutgoingCallingPlanCallMeNow', function onSave(
        close
      ) {
        update(ctrl.editPlan, close)
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanCallMeNowService.update(ctrl.userId, plan)
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('Call Me Now Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()