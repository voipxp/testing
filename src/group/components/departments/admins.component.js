;(function() {
  angular.module('odin.group').component('groupDepartmentAdmins', {
    templateUrl: 'group/components/departments/admins.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      name: '<'
    }
  })

  function Controller(
    Alert,
    GroupDepartmentAdminService,
    SystemLanguageService,
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges

    ctrl.add = add
    ctrl.edit = edit
    ctrl.setUserId = setUserId
    ctrl.newAdmin = {}

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
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
      if (changes.name) {
        ctrl.name = changes.name.currentValue
      }
    }

    function loadAdmins() {
      return GroupDepartmentAdminService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        ctrl.name
      ).then(function(data) {
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

    function add() {
      ctrl.newAdmin = {
        department: {
          serviceProviderId: ctrl.serviceProviderId,
          groupId: ctrl.groupId,
          name: ctrl.name
        },
        language: ctrl.languages.default
      }
      Alert.modal.open('groupDepartmentAdminCreateModal', function(close) {
        create(ctrl.newAdmin, close)
      })
    }

    function edit(admin) {
      ctrl.editAdmin = angular.copy(admin)
      Alert.modal.open(
        'groupDepartmentAdminEditModal',
        function onSave(close) {
          update(ctrl.editAdmin, close)
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
      GroupDepartmentAdminService.store(admin)
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

    function update(admin, callback) {
      Alert.spinner.open()
      GroupDepartmentAdminService.update(admin)
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
      GroupDepartmentAdminService.destroy(admin.userId)
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

    function setUserId(event) {
      ctrl.newAdmin.userId = event.userId
    }
  }
})()
