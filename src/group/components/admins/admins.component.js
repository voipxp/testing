;(function() {
  angular.module('odin.group').component('groupAdmins', {
    templateUrl: 'group/components/admins/admins.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    GroupAdminService,
    GroupAdminPolicyService,
    $routeParams,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.setNewUserId = setNewUserId

    ctrl.add = add
    ctrl.edit = edit
    ctrl.policies = GroupAdminPolicyService.options.policies

    function onInit() {
      ctrl.loading = true
      return loadAdmins()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAdmins() {
      return GroupAdminService.index(ctrl.serviceProviderId, ctrl.groupId).then(
        function(data) {
          console.log('admins', data)
          ctrl.admins = data
          return data
        }
      )
    }

    function loadAdminPolicies(administratorID) {
      return GroupAdminPolicyService.show(administratorID)
    }

    function setNewUserId(event) {
      _.set(ctrl, 'newAdmin.userId', event.userId)
    }

    function add() {
      ctrl.newAdmin = {}
      Alert.modal.open('create-GroupAdmin', function(close) {
        create(ctrl.newAdmin, close)
      })
    }

    function edit(admin) {
      ctrl.editAdmin = angular.copy(admin)
      Alert.spinner.open()
      loadAdminPolicies(admin.administratorID)
        .then(function(policies) {
          ctrl.editPolicies = policies
          Alert.modal.open(
            'update-GroupAdmin',
            function onSave(close) {
              update(
                ctrl.editAdmin,
                admin.administratorID,
                ctrl.editPolicies,
                close
              )
            },
            function onDelete(close) {
              Alert.confirm
                .open('Are you sure you want to delete this Admin?')
                .then(function() {
                  remove(ctrl.editAdmin, close)
                })
            }
          )
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(Alert.spinner.close)
    }

    function create(admin, callback) {
      if (admin.password && admin.password !== admin.password2) {
        Alert.notify.danger('Passwords do not match')
        return
      }
      Alert.spinner.open()
      GroupAdminService.store(ctrl.serviceProviderId, ctrl.groupId, admin)
        .then(loadAdmins)
        .then(function() {
          Alert.notify.success('Admin created')
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

    function update(admin, adminId, policies, callback) {
      Alert.spinner.open()
      return $q
        .all([updateAdmin(admin), updatePolicies(adminId, policies)])
        .then(loadAdmins)
        .then(function() {
          callback()
          Alert.notify.success('Admin Updated')
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function updatePolicies(adminId, policies) {
      return GroupAdminPolicyService.update(adminId, policies)
    }

    function updateAdmin(admin) {
      if (admin.password && admin.password !== admin.password2) {
        return $q.reject('Passwords do not match')
      }
      return GroupAdminService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        admin
      )
    }

    function remove(admin, callback) {
      Alert.spinner.open()
      GroupAdminService.destroy(ctrl.serviceProviderId, ctrl.groupId, admin)
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
