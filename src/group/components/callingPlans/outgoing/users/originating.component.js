;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanOriginatingUsers', {
      templateUrl:
        'group/components/callingPlans/outgoing/users/originating.component.html',
      bindings: { serviceProviderId: '<', groupId: '<' },
      controller: Controller
    })

  function Controller(
    GroupOutgoingCallingPlanOriginatingService,
    UserOutgoingCallingPlanOriginatingService,
    $q,
    Alert
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanOriginatingService.options
    ctrl.onPagination = function(event) {
      ctrl.pager = event.pager
    }

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadGroup(), loadUsers()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadGroup() {
      return GroupOutgoingCallingPlanOriginatingService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.groupPlan = _.find(data.departments, function(department) {
          return !department.department
        })
        console.log('Originating Group', ctrl.groupPlan)
      })
    }

    function loadUsers() {
      return GroupOutgoingCallingPlanOriginatingService.users(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.userPlans = data
        console.log('Originating Users', data)
      })
    }

    function edit(plan) {
      ctrl.editPlan = angular.copy(plan)
      Alert.modal.open(
        'editUserOutgoingCallingPlanOriginating',
        function onSave(close) {
          update(ctrl.editPlan, close)
        }
      )
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanOriginatingService.update(plan.userId, plan)
        .then(loadUsers)
        .then(function() {
          Alert.notify.success(plan.userId + ' Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
