import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular
  .module('odin.group')
  .component('groupOutgoingCallingPlanRedirectingUsers', {
    template,
    controller,
    bindings: { serviceProviderId: '<', groupId: '<' }
  })

controller.$inject = [
  'GroupOutgoingCallingPlanRedirectingService',
  'UserOutgoingCallingPlanRedirectingService',
  '$q',
  'Alert'
]
function controller(
  GroupOutgoingCallingPlanRedirectingService,
  UserOutgoingCallingPlanRedirectingService,
  $q,
  Alert
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.onClick = onClick
  ctrl.onSelect = onSelect
  ctrl.options = UserOutgoingCallingPlanRedirectingService.options

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
      label: 'Casual',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.chargeableDirectoryAssisted',
      label: 'Chargeable DA',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.group',
      label: 'Group',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.international',
      label: 'International',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.operatorAssisted',
      label: 'Operator Assisted',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.premiumServicesI',
      label: 'Premium Services I',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.premiumServicesII',
      label: 'Premium Services II',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.specialServicesI',
      label: 'Special Services I',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.specialServicesII',
      label: 'Special Services II',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.toll',
      label: 'Toll',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.tollFree',
      label: 'Toll Free',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.unknown',
      label: 'Unknown',
      type: 'boolean',
      align: 'centered'
    },
    {
      key: 'userPermissions.urlDialing',
      label: 'URL Dialing',
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
    return GroupOutgoingCallingPlanRedirectingService.show(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.groupPlan = _.find(data.departments, function(department) {
        return !department.department
      })
    })
  }

  function loadUsers() {
    return UserOutgoingCallingPlanRedirectingService.bulkIndex(
      ctrl.serviceProviderId,
      ctrl.groupId
    ).then(function(data) {
      ctrl.userPlans = data
    })
  }

  function onClick(plan) {
    ctrl.editPlan = angular.copy(plan)
    ctrl.editTitle = plan.userId
    Alert.modal.open('editUserOutgoingCallingPlanRedirecting', function(close) {
      update(ctrl.editPlan, close)
    })
  }

  function onSelect(users) {
    ctrl.editPlan = {}
    ctrl.editTitle = users.length + ' Users'
    Alert.modal.open('editUserOutgoingCallingPlanRedirecting', function(close) {
      bulk(users, ctrl.editPlan, close)
    })
  }

  function update(plan, callback) {
    Alert.spinner.open()
    UserOutgoingCallingPlanRedirectingService.update(plan.userId, plan)
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
    UserOutgoingCallingPlanRedirectingService.bulkUpdate({
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
