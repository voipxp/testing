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
    GroupPolicyService,
    $routeParams,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.setNewUserId = setNewUserId

    ctrl.add = add
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.toggleSelect = toggleSelect
    ctrl.policies = GroupAdminPolicyService.options.policies

    ctrl.columns = [
      {
        key: 'administratorID',
        label: 'ID'
      },
      {
        key: 'firstName',
        label: 'First Name'
      },
      {
        key: 'lastName',
        label: 'Last Name'
      },
      {
        key: 'department.fullPathName',
        label: 'Department'
      }
    ]

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadAdmins(), GroupPolicyService.load()])
        .then(function() {
          ctrl.canCreate = GroupPolicyService.adminCreate()
          ctrl.canUpdate = GroupPolicyService.adminUpdate()
        })
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
      if (!ctrl.canCreate) return
      ctrl.newAdminType = 'group'
      ctrl.newAdmin = {}
      Alert.modal.open('create-GroupAdmin', function(close) {
        create(ctrl.newAdmin, close)
      })
    }

    function onClick(admin) {
      if (!ctrl.canUpdate) return
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

    function toggleSelect() {
      if (ctrl.showSelect) {
        ctrl.showSelect = false
        ctrl.selectFilter = {}
      } else {
        ctrl.selectFilter = { department: null }
        ctrl.showSelect = true
      }
    }

    function onSelect(event) {
      ctrl.selectFilter = {}
      if (!ctrl.canUpdate) return
      ctrl.selected = event.length
      ctrl.editPolicies = {}
      Alert.modal.open('update-GroupAdminBulk', function(close) {
        bulkUpdate(event, ctrl.editPolicies, close)
      })
    }

    function create(admin, callback) {
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

    function bulkUpdate(admins, policy, callback) {
      Alert.spinner.open()
      GroupAdminPolicyService.bulk({ users: admins, data: policy })
        .then(function() {
          Alert.notify.success('Admin Policies Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
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
