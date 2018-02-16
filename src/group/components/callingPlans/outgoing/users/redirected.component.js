;(function() {
  angular
    .module('odin.group')
    .component('groupOutgoingCallingPlanRedirectedUsers', {
      templateUrl:
        'group/components/callingPlans/outgoing/users/redirected.component.html',
      bindings: { serviceProviderId: '<', groupId: '<' },
      controller: Controller
    })

  function Controller(
    GroupOutgoingCallingPlanRedirectedService,
    UserOutgoingCallingPlanRedirectedService,
    $q,
    Alert
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.options = UserOutgoingCallingPlanRedirectedService.options
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
      return GroupOutgoingCallingPlanRedirectedService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.groupPlan = _.find(data.departments, function(department) {
          return !department.department
        })
        console.log('group', ctrl.groupPlan)
      })
    }

    function loadUsers() {
      return GroupOutgoingCallingPlanRedirectedService.users(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.userPlans = data
        console.log('Redirected', data)
      })
    }

    function edit(plan) {
      ctrl.editPlan = angular.copy(plan)
      Alert.modal.open('editUserOutgoingCallingPlanRedirected', function onSave(
        close
      ) {
        update(ctrl.editPlan, close)
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanRedirectedService.update(plan.userId, plan)
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
