;(function() {
  angular.module('odin.user').component('userNumber', {
    templateUrl: 'user/components/addresses/number.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(
    Alert,
    UserNumberService,
    UserService,
    $routeParams,
    $q,
    ACL,
    Setting
  ) {
    var ctrl = this
    ctrl.edit = edit
    ctrl.canEdit = ACL.has('Group')
    ctrl.selectPhoneNumber = selectPhoneNumber
    ctrl.selectCLIDPhoneNumber = selectCLIDPhoneNumber
    ctrl.isActivated = isActivated

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId
    ctrl.editCLID = Setting.data('editCLID')
    ctrl.$onInit = onInit

    function onInit() {
      ctrl.loading = true
      $q.all([loadUser(), loadNumbers()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadUser() {
      return UserService.show(ctrl.userId).then(function(data) {
        ctrl.user = data
      })
    }

    function loadNumbers() {
      return UserNumberService.index(ctrl.userId).then(function(data) {
        ctrl.numbers = data
      })
    }

    function isActivated() {
      if (!ctrl.numbers || !ctrl.user) return
      var assigned = _.find(ctrl.numbers, function(number) {
        return String(number.min) == String(ctrl.user.phoneNumber)
      })
      return assigned && assigned.activated
    }

    function edit() {
      ctrl.loadingUser = true
      Alert.modal.open('editUserNumberModal', function(close) {
        update(ctrl.editUser, close)
      })
      loadUser()
        .then(function() {
          ctrl.editUser = angular.copy(ctrl.user)
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loadingUser = false
        })
    }

    function selectPhoneNumber(event) {
      ctrl.editUser.phoneNumber = event.phoneNumber
      setExtension()
    }

    function selectCLIDPhoneNumber(event) {
      ctrl.editUser.callingLineIdPhoneNumber = event.phoneNumber
    }

    function setExtension() {
      var ext = ctrl.editUser.phoneNumber
        ? ctrl.editUser.phoneNumber.slice(-4)
        : null
      ctrl.editUser.extension = ext
    }

    function update(user, callback) {
      Alert.spinner.open()
      return UserService.update(ctrl.userId, user)
        .then(onInit)
        .then(function() {
          Alert.notify.success('User Updated')
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
