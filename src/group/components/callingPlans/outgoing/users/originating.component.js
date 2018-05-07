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
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.options = UserOutgoingCallingPlanOriginatingService.options

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
        key: 'userPermissions.casual',
        label: 'Casual'
      },
      {
        key: 'userPermissions.chargeableDirectoryAssisted',
        label: 'Chargeable DA'
      },
      {
        key: 'userPermissions.group',
        label: 'Group'
      },
      {
        key: 'userPermissions.international',
        label: 'International'
      },
      {
        key: 'userPermissions.operatorAssisted',
        label: 'Operator Assisted'
      },
      {
        key: 'userPermissions.premiumServicesI',
        label: 'Premium Services I'
      },
      {
        key: 'userPermissions.premiumServicesII',
        label: 'Premium Services II'
      },
      {
        key: 'userPermissions.specialServicesI',
        label: 'Special Services I'
      },
      {
        key: 'userPermissions.specialServicesII',
        label: 'Special Services II'
      },
      {
        key: 'userPermissions.toll',
        label: 'Toll'
      },
      {
        key: 'userPermissions.tollFree',
        label: 'Toll Free'
      },
      {
        key: 'userPermissions.unknown',
        label: 'Unknown'
      },
      {
        key: 'userPermissions.urlDialing',
        label: 'URL Dialing'
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

    function onClick(plan) {
      ctrl.editPlan = angular.copy(plan)
      ctrl.editTitle = plan.userId
      Alert.modal.open('editUserOutgoingCallingPlanOriginating', function(
        close
      ) {
        update(ctrl.editPlan, close)
      })
    }

    function onSelect(users) {
      ctrl.editPlan = {}
      ctrl.editTitle = users.length + ' Users'
      Alert.modal.open('editUserOutgoingCallingPlanOriginating', function(
        close
      ) {
        bulk(users, ctrl.editPlan, close)
      })
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

    function bulk(users, data, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanOriginatingService.bulk({
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
