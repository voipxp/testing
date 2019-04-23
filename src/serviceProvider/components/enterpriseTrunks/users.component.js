;(function() {
  angular
    .module('odin.serviceProvider')
    .component('enterpriseEnterpriseTrunkUsers', {
      templateUrl:
        'serviceProvider/components/enterpriseTrunks/users.component.html',
      controller: Controller,
      require: { parent: '^enterpriseEnterpriseTrunk' }
    })

  function Controller(
    Alert,
    EnterpriseEnterpriseTrunkUserService,
    EnterpriseEnterpriseTrunkAvailableUserService
  ) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.edit = edit

    function activate() {
      ctrl.trunkName = ctrl.parent.trunkName
      ctrl.loading = true
      loadAssignedUsers()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadAssignedUsers() {
      return EnterpriseEnterpriseTrunkUserService.index(
        ctrl.parent.serviceProviderId,
        ctrl.parent.trunkName
      ).then(function(data) {
        ctrl.users = data.users
        console.log('loadAssignedUsers', data)
        return data
      })
    }

    function loadAvailableUsers() {
      return EnterpriseEnterpriseTrunkAvailableUserService.index(
        ctrl.parent.serviceProviderId
      ).then(function(data) {
        ctrl.assignedUsers = angular.copy(ctrl.users)
        ctrl.availableUsers = _.filter(data.users, function(user) {
          return !_.find(ctrl.assignedUsers, { userId: user.userId })
        })
        console.log('loadAvailableUsers', ctrl.availableUsers)
        return data
      })
    }

    function edit() {
      Alert.spinner.open()
      loadAvailableUsers()
        .then(function() {
          Alert.modal.open(
            'editEnterpriseEnterpriseTrunkUsers',
            function onSave(close) {
              update(ctrl.assignedUsers, close)
            }
          )
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function update(users, callback) {
      var newUsers = { users: users }
      Alert.spinner.open()
      EnterpriseEnterpriseTrunkUserService.update(
        ctrl.parent.serviceProviderId,
        ctrl.parent.trunkName,
        newUsers
      )
        .then(loadAssignedUsers)
        .then(function() {
          Alert.notify.success('Users Updated')
          if (_.isFunction(callback)) {
            callback(0)
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