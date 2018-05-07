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
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.options = UserOutgoingCallingPlanRedirectedService.options

    ctrl.columns = [
      {
        key: 'lastName',
        label: 'Last Name'
      },
      {
        key: 'firstName',
        label: 'First Name'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number'
      },
      {
        key: 'extension',
        label: 'Extension'
      },
      {
        key: 'useCustomSettings',
        label: 'Custom',
        type: 'boolean',
        align: 'centered'
      },
      {
        key: 'userPermissions.outsideGroup',
        label: 'Outside Group',
        type: 'boolean',
        align: 'centered'
      }
    ]

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

    function onClick(plan) {
      ctrl.editPlan = angular.copy(plan)
      ctrl.editTitle = plan.userId
      Alert.modal.open('editUserOutgoingCallingPlanRedirected', function(
        close
      ) {
        update(ctrl.editPlan, close)
      })
    }

    function onSelect(users) {
      ctrl.editPlan = {}
      ctrl.editTitle = users.length + ' Users'
      Alert.modal.open('editUserOutgoingCallingPlanRedirected', function(
        close
      ) {
        bulk(users, ctrl.editPlan, close)
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

    function bulk(users, data, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanRedirectedService.bulk({
        users: users,
        data: data
      })
        .then(loadUsers)
        .then(function() {
          Alert.notify.success('Bulk Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
