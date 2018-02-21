;(function() {
  angular.module('odin.group').component('groupAdmins', {
    templateUrl: 'group/components/admins/admins.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    GroupAdminService,
    GroupAdminPolicyService,
    GroupDepartmentAdminService,
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

    function loadAdminPolicies(admin) {
      Alert.spinner.open()
      var promise = admin.department
        ? $q.resolve()
        : GroupAdminPolicyService.show(admin.administratorID)
      return promise
        .then(function(data) {
          ctrl.editPolicies = data
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(Alert.spinner.close)
    }

    function setNewUserId(event) {
      _.set(ctrl, 'newAdmin.userId', event.userId)
    }

    function add() {
      ctrl.newAdminType = 'group'
      ctrl.newAdmin = {}
      Alert.modal.open('create-GroupAdmin', function(close) {
        create(ctrl.newAdmin, close)
      })
    }

    function edit(admin) {
      ctrl.editAdmin = angular.copy(admin)
      loadAdminPolicies(admin).then(function() {
        Alert.modal.open(
          'update-GroupAdmin',
          function onSave(close) {
            update(ctrl.editAdmin, ctrl.editPolicies, close)
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
    }

    function create(admin, callback) {
      if (admin.password && admin.password !== admin.password2) {
        Alert.notify.danger('Passwords do not match')
        return
      }
      Alert.spinner.open()
      var promise
      if (ctrl.newAdminType === 'department') {
        promise = GroupDepartmentAdminService.store(
          ctrl.serviceProviderId,
          ctrl.groupId,
          admin.department.name,
          admin
        )
      } else {
        promise = GroupAdminService.store(
          ctrl.serviceProviderId,
          ctrl.groupId,
          admin
        )
      }
      promise
        .then(loadAdmins)
        .then(function() {
          Alert.notify.success('Admin created')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(admin, policies, callback) {
      if (admin.password && admin.password !== admin.password2) {
        Alert.notify.warning('Passwords do not match')
        return
      }
      Alert.spinner.open()
      return $q
        .all([updateAdmin(admin), updatePolicies(admin, policies)])
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

    function updatePolicies(admin, policies) {
      if (admin.department) return $q.resolve()
      return GroupAdminPolicyService.update(admin.administratorID, policies)
    }

    function updateAdmin(admin) {
      if (admin.department) {
        return GroupDepartmentAdminService.update(
          ctrl.serviceProviderId,
          ctrl.groupId,
          admin.department.name,
          admin
        )
      } else {
        return GroupAdminService.update(
          ctrl.serviceProviderId,
          ctrl.groupId,
          admin
        )
      }
    }

    function remove(admin, callback) {
      Alert.spinner.open()
      var promise
      if (admin.department) {
        promise = GroupDepartmentAdminService.destroy(
          ctrl.serviceProviderId,
          ctrl.groupId,
          admin.department.name,
          admin
        )
      } else {
        promise = GroupAdminService.destroy(
          ctrl.serviceProviderId,
          ctrl.groupId,
          admin
        )
      }

      promise
        .then(loadAdmins)
        .then(function() {
          Alert.notify.success('Admin removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
