;(function() {
  angular.module('odin.user').component('userBroadWorksAnywhereNumbers', {
    templateUrl:
      'user/components/broadWorksAnywhere/components/broadWorksAnywhereNumbers.component.html',
    controller: Controller,
    bindings: { userId: '<', numbers: '<' },
    require: { parent: '^userBroadWorksAnywhere' }
  })

  function Controller(Alert, PhoneNumberBroadWorksAnywhereService) {
    var ctrl = this
    ctrl.add = add
    ctrl.edit = edit

    function add() {
      if (!ctrl.parent.module.permissions.create) return
      ctrl.editNumber = { userId: ctrl.userId }
      Alert.modal.open('editUserBroadworksAnywherePhoneNumber', function onSave(
        close
      ) {
        ctrl.editNumber.phoneNumber = ctrl.editNumber.newPhoneNumber
        create(ctrl.editNumber, close)
      })
    }

    function edit(number) {
      if (!ctrl.parent.module.permissions.update) return
      ctrl.editNumber = angular.copy(number)
      ctrl.editNumber.newPhoneNumber = ctrl.editNumber.phoneNumber
      Alert.modal.open(
        'editUserBroadworksAnywherePhoneNumber',
        function onSave(close) {
          update(ctrl.editNumber, close)
        },
        function onDelete(close) {
          Alert.confirm
            .open('Are you sure you want to delete this phone number?')
            .then(function() {
              destroy(number, close)
            })
        }
      )
    }

    function update(number, callback) {
      Alert.spinner.open()
      PhoneNumberBroadWorksAnywhereService.update(
        ctrl.userId,
        number.phoneNumber,
        number
      )
        .then(function() {
          return ctrl.parent.reload()
        })
        .then(function() {
          Alert.notify.success('Number Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function create(number, callback) {
      Alert.spinner.open()
      PhoneNumberBroadWorksAnywhereService.store(ctrl.userId, number)
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Number Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(number, callback) {
      Alert.spinner.open()
      PhoneNumberBroadWorksAnywhereService.destroy(
        ctrl.userId,
        number.phoneNumber
      )
        .then(ctrl.parent.reload)
        .then(function() {
          Alert.notify.success('Phone Number Deleted')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
