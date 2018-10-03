;(function() {
  angular.module('odin.user').component('userSpeedDial100', {
    templateUrl: 'user/components/speedDial100/speedDial100.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, SpeedDial100Service, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.add = add

    ctrl.columns = [
      {
        key: 'speedCode',
        label: 'Code'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number'
      },
      {
        key: 'description',
        label: 'Description'
      }
    ]

    // generate 100 speed codes
    var allSpeedCodes = _.range(0, 100).map(function(number) {
      return number.toString()
    })

    function onInit() {
      ctrl.isLoading = true
      return $q
        .all([loadSpeedCodes(), loadModule()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.isLoading = false
        })
    }

    function loadModule() {
      return Module.show('Speed Dial 100').then(function(data) {
        ctrl.module = data
      })
    }

    function loadSpeedCodes() {
      return SpeedDial100Service.index(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function add() {
      var usedSpeedCodes = _.map(ctrl.settings.speedCodes, 'speedCode')
      ctrl.availableSpeedCodes = _.difference(allSpeedCodes, usedSpeedCodes)
      ctrl.newSpeedCode = {}
      Alert.modal.open('add-speedDial100SpeedCode', function onSave(close) {
        create(ctrl.newSpeedCode, close)
      })
    }

    function edit(code) {
      console.log('edit', code)
      ctrl.editSpeedCode = angular.copy(code)
      Alert.modal.open(
        'edit-speedDial100SpeedCode',
        function onSave(close) {
          update(ctrl.editSpeedCode, close)
        },
        function onDelete(close) {
          Alert.confirm
            .open('Are you sure you want to delete this SpeedCode?')
            .then(function() {
              destroy(ctrl.editSpeedCode, close)
            })
        }
      )
    }

    function create(speedCode, callback) {
      var settings = {
        userId: ctrl.userId,
        speedCodes: [speedCode]
      }
      Alert.spinner.open()
      SpeedDial100Service.store(ctrl.userId, settings)
        .then(loadSpeedCodes)
        .then(function() {
          Alert.notify.success('SpeedCode Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function update(speedCode, callback) {
      var settings = {
        userId: ctrl.userId,
        speedCodes: [speedCode]
      }
      Alert.spinner.open()
      SpeedDial100Service.update(ctrl.userId, settings)
        .then(loadSpeedCodes)
        .then(function() {
          Alert.notify.success('SpeedCode Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function destroy(speedCode, callback) {
      var settings = {
        userId: ctrl.userId,
        speedCodes: [speedCode]
      }
      Alert.spinner.open()
      SpeedDial100Service.destroy(ctrl.userId, settings)
        .then(loadSpeedCodes)
        .then(function() {
          Alert.notify.warning('SpeedCode Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
