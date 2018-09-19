;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderAdmins', {
    templateUrl: 'serviceProvider/components/admins/admins.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    ServiceProviderAdminService,
    ServiceProviderAdminPolicyService,
    SystemLanguageService,
    $q,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.add = add
    ctrl.edit = edit
    ctrl.policies = ServiceProviderAdminPolicyService.options.policies

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadAdmins(), loadLanguages()])
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
      return ServiceProviderAdminService.index(ctrl.serviceProviderId).then(
        function(data) {
          console.log('admins', data)
          ctrl.admins = data
          return data
        }
      )
    }

    function loadLanguages() {
      return SystemLanguageService.index().then(function(data) {
        console.log('languages', data)
        ctrl.languages = data
        return data
      })
    }

    function loadAdminPolicies(userId) {
      return ServiceProviderAdminPolicyService.show(userId)
    }

    function add() {
      ctrl.newAdmin = {
        language: ctrl.languages.default,
        administratorType: 'Normal'
      }
      Alert.modal.open('serviceProviderAdminCreateModal', function(close) {
        create(ctrl.newAdmin, close)
      })
    }

    function edit(admin) {
      ctrl.editAdmin = angular.copy(admin)
      ctrl.loadingEdit = true
      loadAdminPolicies(admin.userId)
        .then(function(policies) {
          ctrl.editPolicies = policies
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loadingEdit = false
        })
      Alert.modal.open(
        'serviceProviderAdminEditModal',
        function onSave(close) {
          update(ctrl.editAdmin, close)
          updatePolicies(admin.userId, ctrl.editPolicies, close)
        },
        function onDelete(close) {
          Alert.confirm
            .open('Are you sure you want to delete this Admin?')
            .then(function() {
              remove(ctrl.editAdmin, close)
            })
        }
      )
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

    function updatePolicies(adminId, policies, callback) {
      Alert.spinner.open()
      ServiceProviderAdminPolicyService.update(adminId, policies)
        .then(function() {
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

    function update(admin, callback) {
      Alert.spinner.open()
      ServiceProviderAdminService.update(ctrl.serviceProviderId, admin)
        .then(loadAdmins)
        .then(function() {
          Alert.notify.success('Admin updated')
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
})()
