import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.serviceProvider').component('serviceProviderAdmins', {
  template,
  controller,
  bindings: { serviceProviderId: '<' }
})

controller.$inject = [
  'Alert',
  'ServiceProviderAdminService',
  'ServiceProviderAdminPolicyService',
  'ServiceProviderPolicyService',
  'SystemLanguageService',
  '$q'
]
function controller(
  Alert,
  ServiceProviderAdminService,
  ServiceProviderAdminPolicyService,
  ServiceProviderPolicyService,
  SystemLanguageService,
  $q
) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.$onChanges = onChanges
  ctrl.add = add
  ctrl.edit = edit
  ctrl.policies = ServiceProviderAdminPolicyService.options.policies

  function onInit() {
    ctrl.loading = true
    return $q
      .all([loadAdmins(), loadLanguages(), ServiceProviderPolicyService.load()])
      .then(function() {
        ctrl.canRead = ServiceProviderPolicyService.adminRead()
        ctrl.canCreate = ServiceProviderPolicyService.adminCreate()
        ctrl.canUpdate = ServiceProviderPolicyService.adminUpdate()
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        ctrl.loading = false
      })
  }

  function onChanges(changes) {
    if (changes.serviceProviderId) {
      ctrl.serviceProviderId = changes.serviceProviderId.currentValue
    }
  }

  function loadAdmins() {
    return ServiceProviderAdminService.index(ctrl.serviceProviderId).then(function(data) {
      ctrl.admins = data
      return data
    })
  }

  function loadLanguages() {
    return SystemLanguageService.index().then(function(data) {
      ctrl.languages = data
      return data
    })
  }

  function loadAdminPolicies(userId) {
    return ServiceProviderAdminPolicyService.show(userId)
  }

  function add() {
    ctrl.newAdmin = {
      serviceProviderId: ctrl.serviceProviderId,
      groupId: ctrl.groupId,
      language: ctrl.languages.default,
      administratorType: 'Normal'
    }
    Alert.modal.open('serviceProviderAdminCreateModal', function(close) {
      create(ctrl.newAdmin, close)
    })
  }

  function edit(admin) {
    if (ctrl.canUpdate) {
      ctrl.editAdmin = angular.copy(admin)
      Alert.spinner.open()
      loadAdminPolicies(admin.userId)
        .then(function(policies) {
          ctrl.editPolicies = policies
          Alert.modal.open(
            'serviceProviderAdminEditModal',
            function onSave(close) {
              updateBoth(ctrl.editAdmin, ctrl.editPolicies, close)
            },
            function onDelete(close) {
              Alert.confirm.open('Are you sure you want to delete this Admin?').then(function() {
                remove(ctrl.editAdmin, close)
              })
            }
          )
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }

  function create(admin, callback) {
    Alert.spinner.open()
    ServiceProviderAdminService.store(ctrl.serviceProviderId, admin)
      .then(loadAdmins)
      .then(function() {
        Alert.notify.success('Administrator created')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }

  function updateBoth(admin, policies, callback) {
    Alert.spinner.open()
    update(admin)
      .then(() => updatePolicies(admin.userId, policies))
      .then(loadAdmins)
      .then(() => {
        Alert.notify.success('Admin updated')
        callback()
      })
      .catch(Alert.notify.danger)
      .finally(Alert.spinner.close)
  }

  function updatePolicies(adminId, policies) {
    return ServiceProviderAdminPolicyService.update(adminId, policies)
  }

  function update(admin) {
    return ServiceProviderAdminService.update(ctrl.serviceProviderId, admin)
  }

  function remove(admin, callback) {
    Alert.spinner.open()
    ServiceProviderAdminService.destroy(ctrl.serviceProviderId, admin)
      .then(loadAdmins)
      .then(function() {
        Alert.notify.success('Admin removed')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(function(error) {
        Alert.notify.danger(error)
      })
      .finally(function() {
        Alert.spinner.close()
      })
  }
}
