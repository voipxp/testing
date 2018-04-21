;(function() {
  angular.module('odin.user').component('userSpeedDial100', {
    templateUrl: 'user/components/speedDial100/speedDial100.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, SpeedDial100Service, Session, $q, Module) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.saveAlternateNumbers = saveAlternateNumbers
    ctrl.speedCodes = SpeedDial100Service.options.speedCodes
    ctrl.speedCodesEntry = []
    ctrl.speedDialNumbers = {}
    ctrl.speedDialCode = {}
    ctrl.speedDialCodeOrig = {}
    ctrl.range = _.range(1, 11)
    ctrl.loginType = Session.data('loginType')
    ctrl.editSpeedDialCode = editSpeedDialCode
    ctrl.addSpeedDialEntry = addSpeedDialEntry
    ctrl.loadSpeedDialCodes = loadSpeedDialCodes
    ctrl.isAdd = false

    function onInit() {
      ctrl.loading = true
      return $q
        .all([loadSpeedDialNumbers(), loadModule()])
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Speed Dial 100').then(function(data) {
        ctrl.module = data
      })
    }

    function editSpeedDialCode(speedDialCode) {
      if (!ctrl.module.permissions.update) return
      ctrl.isAdd = false
      ctrl.speedDialCode = speedDialCode
      ctrl.speedDialCode.speedCode = parseInt(ctrl.speedDialCode.speedCode)
      ctrl.speedDialCodeOrig = angular.copy(speedDialCode)
      console.log(
        'ctrl.speedDialCode     : ' + JSON.stringify(ctrl.speedDialCode)
      )
      console.log(
        'ctrl.speedDialCodeOrig : ' + JSON.stringify(ctrl.speedDialCodeOrig)
      )
      ctrl.loadingEntry = true
      loadSpeedDialCodes()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loadingEntry = false
        })

      var onDelete
      if (ctrl.module.permissions.delete) {
        onDelete = function(close) {
          _deleteSpeedDialCode(ctrl.speedDialCode, close)
        }
      }

      Alert.modal.open(
        'edit-speedDialEntryEntry',
        function onSave(close) {
          _saveSpeedDialCode(ctrl.speedDialCode, close)
        },
        onDelete
      )
    }

    function addSpeedDialEntry() {
      ctrl.isAdd = true
      ctrl.loadingEntry = true
      loadSpeedDialCodes()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loadingEntry = false
        })
      Alert.modal.open('edit-speedDialEntryEntry', function onSave(close) {
        _addSpeedDialEntry(ctrl.speedDialCode, close)
      })
    }

    function _deleteSpeedDialCode(speedDialCode, callback) {
      Alert.spinner.open()
      var arr = { speedDialEntry: [speedDialCode] }

      SpeedDial100Service.destroy(ctrl.userId, arr)
        .then(function() {
          ctrl.speedDialCode = speedDialCode
          Alert.notify.danger('Saving speed dial code complete')
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([loadSpeedDialCodes()])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function _addSpeedDialEntry(speedDialCode, callback) {
      Alert.spinner.open()
      var arr = { speedDialEntry: [speedDialCode] }
      SpeedDial100Service.create(ctrl.userId, arr)
        .then(function() {
          ctrl.speedDialCode = speedDialCode
          Alert.notify.danger('Speed dial entry complete')
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([loadSpeedDialCodes()])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function _saveSpeedDialCode(speedDialCode, callback) {
      Alert.spinner.open()
      var arr = { speedDialEntry: [speedDialCode] }
      SpeedDial100Service.update(ctrl.userId, arr)
        .then(function() {
          ctrl.speedDialCode = speedDialCode
          Alert.notify.danger('Saving speed dial code complete')
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([loadSpeedDialCodes(), loadSpeedDialNumbers()])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadSpeedDialCodes() {
      return SpeedDial100Service.index(ctrl.userId).then(function(data) {
        ctrl.speedDialNumbers = data
        var arr = []
        Object.keys(data.speedDialEntry).forEach(function(key) {
          arr.push(parseInt(data.speedDialEntry[key].speedCode))
          console.log(key, data.speedDialEntry[key])
        })
        ctrl.speedCodesEntry = _.difference(ctrl.speedCodes, arr)
        ctrl.speedCodesEntry.push(parseInt(ctrl.speedDialCode.speedCode))
        return ctrl.speedDialNumbers
      })
    }

    function loadSpeedDialNumbers() {
      return SpeedDial100Service.index(ctrl.userId).then(function(data) {
        console.log(data)
        ctrl.speedDialNumbers = data
        return ctrl.speedDialNumbers
      })
    }

    function saveAlternateNumbers(speedDialNumbers, callback) {
      console.log(
        '{speedDialNumbers: ' + JSON.stringify(speedDialNumbers) + '}'
      )
      console.log('{ctrl.userId: ' + ctrl.userId + '}')

      Alert.spinner.open()
      SpeedDial100Service.update(ctrl.userId, speedDialNumbers)
        .then(function() {
          Alert.notify.danger('Alternate numbers saved')
          Alert.notify.success('Alternate numbers saved')
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
