;(function() {
  angular.module('odin.user').component('userAliases', {
    templateUrl: 'user/components/addresses/aliases.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(Alert, $scope, UserService, ACL) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.setAlias1 = setAlias1
    ctrl.setAlias2 = setAlias2
    ctrl.setAlias3 = setAlias3
    ctrl.canEdit = ACL.has('Group')

    function onInit() {
      ctrl.loading = true
      loadUser()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUser() {
      return UserService.show(ctrl.userId).then(function(data) {
        ctrl.user = data
        console.log('data', data)
      })
    }

    function edit() {
      ctrl.editUser = angular.copy(ctrl.user)
      Alert.modal.open('userProfileAliasModal', function(close) {
        update(ctrl.editUser, close)
      })
    }

    function setAlias1(event) {
      ctrl.editUser.aliases[0] = event.userId
    }

    function setAlias2(event) {
      ctrl.editUser.aliases[1] = event.userId
    }

    function setAlias3(event) {
      ctrl.editUser.aliases[2] = event.userId
    }

    function update(user, callback) {
      var newAliases = _.filter(user.aliases, function(alias) {
        return !/^\s*@/.test(alias)
      })
      var editUser = angular.copy(user)
      editUser.aliases = newAliases
      Alert.spinner.open()
      UserService.update(ctrl.userId, editUser)
        .then(loadUser)
        .then(function() {
          Alert.notify.success('Aliases Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
