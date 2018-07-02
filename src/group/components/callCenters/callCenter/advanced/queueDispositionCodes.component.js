;(function() {
  angular
    .module('odin.group')
    .component('groupCallCenterQueueDispositionCodes', {
      templateUrl:
        'group/components/callCenters/callCenter/advanced/queueDispositionCodes.component.html',
      controller: Controller,
      bindings: { serviceUserId: '<' }
    })

  function Controller(
    GroupCallCenterQueueDispositionCodeService,
    GroupCallCenterQueueDispositionCodeSettingsService,
    Alert,
    $q,
    $scope
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.editCode = editCode
    ctrl.addCode = addCode
    ctrl.removeCode = removeCode

    function onInit() {
      ctrl.loading = true
      $q.all([loadDispositionCodes(), loadSettings()])
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.serviceUserId) {
        ctrl.serviceUserId = changes.serviceUserId.currentValue
      }
    }

    function loadDispositionCodes() {
      return GroupCallCenterQueueDispositionCodeService.index(
        ctrl.serviceUserId
      ).then(function(data) {
        console.log('codes', data)
        ctrl.codes = data
      })
    }

    function loadSettings() {
      return GroupCallCenterQueueDispositionCodeSettingsService.show(
        ctrl.serviceUserId
      ).then(function(data) {
        console.log('settings', data)
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open(
        'editGroupCallCenterDispositionCodeSettings',
        function onSave(close) {
          update(ctrl.editSettings, close)
        }
      )
    }

    function update(settings, callback) {
      console.log('update', settings)
      Alert.spinner.open()
      GroupCallCenterQueueDispositionCodeSettingsService.update(
        ctrl.serviceUserId,
        settings
      )
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Disposition Code Settings Updated')
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

    function addCode() {
      if ($scope.createGroupCallCenterQueueDispositionCodeForm) {
        $scope.createGroupCallCenterQueueDispositionCodeForm.$setPristine()
      }
      ctrl.newCode = { code: null, description: null, isActive: false }
      Alert.modal.open(
        'createGroupCallCenterQueueDispositionCode',
        function onSave(close) {
          createCode(ctrl.newCode, close)
        }
      )
    }

    function createCode(code, callback) {
      Alert.spinner.open()
      GroupCallCenterQueueDispositionCodeService.store(ctrl.serviceUserId, code)
        .then(loadDispositionCodes)
        .then(function() {
          Alert.notify.success('Disposition Code Created')
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

    function editCode(code) {
      ctrl.selectedCode = angular.copy(code)
      Alert.modal.open(
        'editGroupCallCenterQueueDispositionCode',
        function onSave(close) {
          updateCode(ctrl.selectedCode, close)
        },
        function onDelete(close) {
          removeCode(ctrl.selectedCode, close)
        }
      )
    }

    function updateCode(code, callback) {
      Alert.spinner.open()
      GroupCallCenterQueueDispositionCodeService.update(
        ctrl.serviceUserId,
        code.code,
        code
      )
        .then(loadDispositionCodes)
        .then(function() {
          Alert.notify.success('Disposition Code Updated')
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

    function removeCode(code, callback) {
      Alert.confirm
        .open('Are you sure you want to remove this Disposition Code?')
        .then(function() {
          Alert.spinner.open()
          GroupCallCenterQueueDispositionCodeService.destroy(
            ctrl.serviceUserId,
            code.code
          )
            .then(loadDispositionCodes)
            .then(function() {
              Alert.notify.success('Disposition Code Updated')
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
        })
    }
  }
})()
