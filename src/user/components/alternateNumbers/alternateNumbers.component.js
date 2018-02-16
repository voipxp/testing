;(function() {
  angular.module('odin.user').component('userAlternateNumbers', {
    templateUrl:
      'user/components/alternateNumbers/alternateNumbers.component.html',
    controller: AlternateNumbers,
    bindings: { module: '<' }
  })

  function AlternateNumbers(
    Alert,
    $q,
    AlternateNumbersService,
    Session,
    GroupNumberService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    ctrl.saveAlternateNumbers = saveAlternateNumbers

    ctrl.ringPatterns = AlternateNumbersService.options.ringPatterns
    ctrl.minAlternateNumbers =
      AlternateNumbersService.options.minAlternateNumbers
    ctrl.maxAlternateNumbers =
      AlternateNumbersService.options.maxAlternateNumbers
    ctrl.alternateNumberRange =
      AlternateNumbersService.options.alternateNumberRange
    ctrl.alternateNumberRangeEntry =
      AlternateNumbersService.options.alternateNumberRange

    ctrl.alternateNumbers = {}
    ctrl.alternateNumber = {}
    ctrl.alternateNumberOrig = {}
    ctrl.range = _.range(1, 11)
    ctrl.loginType = Session.data('loginType')
    ctrl.editAlternateEntry = editAlternateEntry
    ctrl.setExtension = setExtension
    ctrl.addAlternateEntry = addAlternateEntry
    ctrl.isAllowed = false

    function onInit() {
      ctrl.isAllowed = ctrl.loginType !== 'User'
      ctrl.loading = true
      return $q
        .all([loadAlternateNumbers(), loadAvailableNumbers()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          console.log(' ctrl.fromDnCriteriaMax : ' + ctrl.fromDnCriteriaMax)
          ctrl.loading = false
        })
    }

    function editAlternateEntry(alternateNumber) {
      Alert.spinner.open()

      ctrl.alternateNumber = alternateNumber
      ctrl.alternateNumberOrig = angular.copy(alternateNumber)
      loadAvailableNumbers()
      loadAlternateNumbersEntry()
        .then(function() {
          ctrl.availableNumbers = ctrl.availableNumbers.concat({
            min: ctrl.alternateNumber.phoneNumber
          })
          Alert.modal.open(
            'edit-alternateNumberEntry',
            function onSave(close) {
              _saveAlternateEntry(ctrl.alternateNumber, close)
            },
            function onDelete(close) {
              _deleteAlternateEntry(ctrl.alternateNumber, close)
            }
          )
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function addAlternateEntry() {
      Alert.spinner.open()
      loadAvailableNumbers()
        .then(function() {})
        .then(function() {
          loadAlternateNumbersEntry()
        })
        .then(function() {
          Alert.modal.open('edit-alternateNumberEntry', function onSave(close) {
            _addAlternateEntry(ctrl.alternateNumber, close)
          })
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function _deleteAlternateEntry(alternateNumber, callback) {
      Alert.spinner.open()
      alternateNumber.phoneNumber = null
      alternateNumber.extension = null
      alternateNumber.ringPattern = null
      var arr = { alternateEntries: [alternateNumber] }

      AlternateNumbersService.update(ctrl.userId, arr)
        .then(function() {
          ctrl.alternateNumber = alternateNumber
          Alert.notify.danger('Saving Alternate Number entry complete')
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([loadAlternateNumbersEntry(), loadAvailableNumbers()])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function _addAlternateEntry(alternateNumber, callback) {
      Alert.spinner.open()
      var arr = { alternateEntries: [alternateNumber] }
      AlternateNumbersService.update(ctrl.userId, arr)
        .then(function() {
          ctrl.alternateNumber = alternateNumber
          Alert.notify.danger('Saving Alternate Number entry complete')
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([loadAlternateNumbersEntry(), loadAvailableNumbers()])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function _saveAlternateEntry(alternateNumber, callback) {
      Alert.spinner.open()
      var arr = { alternateEntries: [alternateNumber] }
      if (ctrl.alternateNumberOrig.entry !== ctrl.alternateNumber.entry) {
        console.log('need to reset : ' + ctrl.alternateNumberOrig.entry)
        ctrl.alternateNumberOrig.phoneNumber = null
        ctrl.alternateNumberOrig.extension = null
        ctrl.alternateNumberOrig.ringPattern = null
        if (alternateNumber.entry < ctrl.alternateNumberOrig.entry) {
          arr = {
            alternateEntries: [alternateNumber, ctrl.alternateNumberOrig]
          }
        } else {
          arr = {
            alternateEntries: [ctrl.alternateNumberOrig, alternateNumber]
          }
        }
        console.log(arr)
      } else {
        arr = { alternateEntries: [alternateNumber] }
      }

      AlternateNumbersService.update(ctrl.userId, arr)
        .then(function() {
          ctrl.alternateNumber = alternateNumber
          Alert.notify.danger('Saving Alternate Number entry complete')
          if (_.isFunction(callback)) {
            callback()
          }
          return $q.all([loadAlternateNumbersEntry(), loadAvailableNumbers()])
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function setExtension() {
      var ext = ctrl.alternateNumber.phoneNumber
        ? ctrl.alternateNumber.phoneNumber.slice(-4)
        : null
      ctrl.alternateNumber.extension = ext
      console.log('setExtension', ctrl.alternateNumber.extension)
    }

    function loadAvailableNumbers() {
      console.log('load numbers')
      if (ctrl.loginType !== 'User') {
        return GroupNumberService.index(
          ctrl.serviceProviderId,
          ctrl.groupId,
          'available'
        ).then(function(data) {
          console.log('availableNumbers', data)
          ctrl.availableNumbers = data
          return data
        })
      } else {
        ctrl.availableNumbers = []
        $q.resolve(ctrl.alternateNumbers)
      }
    }

    function loadAlternateNumbersEntry() {
      return AlternateNumbersService.index(ctrl.userId).then(function(data) {
        ctrl.alternateNumbers = data
        var arr = []
        Object.keys(data.alternateEntries).forEach(function(key) {
          arr.push(data.alternateEntries[key].entry)
          console.log(key, data.alternateEntries[key])
        })
        ctrl.alternateNumberRangeEntry = _.difference(
          ctrl.alternateNumberRange,
          arr
        )
        ctrl.alternateNumberRangeEntry.push(ctrl.alternateNumber.entry)
        ctrl.alternateNumberRangeEntry.sort(function(a, b) {
          return a - b
        })
        return ctrl.alternateNumbers
      })
    }

    function loadAlternateNumbers() {
      return AlternateNumbersService.index(ctrl.userId).then(function(data) {
        ctrl.alternateNumbers = data
        return ctrl.alternateNumbers
      })
    }

    function saveAlternateNumbers(alternateNumbers, callback) {
      console.log(
        '{alternateNumbers: ' + JSON.stringify(alternateNumbers) + '}'
      )
      console.log('{ctrl.userId: ' + ctrl.userId + '}')

      Alert.spinner.open()
      AlternateNumbersService.update(ctrl.userId, alternateNumbers)
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
