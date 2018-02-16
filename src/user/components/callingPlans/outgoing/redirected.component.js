;(function() {
  angular.module('odin.user').component('userOutgoingCallingPlanRedirected', {
    templateUrl:
      'user/components/callingPlans/outgoing/redirected.component.html',
    bindings: { userId: '<' },
    controller: Controller
  })

  function Controller(Alert, UserOutgoingCallingPlanRedirectedService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanRedirectedService.options

    function onInit() {
      ctrl.loading = true
      loadPlan()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPlan() {
      return UserOutgoingCallingPlanRedirectedService.show(ctrl.userId).then(
        function(data) {
          console.log('plan', data)
          ctrl.plan = data
        }
      )
    }

    function edit() {
      ctrl.editPlan = angular.copy(ctrl.plan)
      Alert.modal.open('editUserOutgoingCallingPlanRedirected', function onSave(
        close
      ) {
        update(ctrl.editPlan, close)
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanRedirectedService.update(ctrl.userId, plan)
        .then(loadPlan)
        .then(function() {
          Alert.notify.success('Redirected Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
