;(function() {
  angular.module('odin.group').component('groupFeatureAccessCodes', {
    templateUrl:
      'group/components/featureAccessCodes/featureAccessCodes.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    GroupFeatureAccessCodesService,
    GroupSpeedDial100Service,
    $q,
    GroupPolicyService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.reset = reset
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.toggleSelect = toggleSelect
    ctrl.editSpeedDialCode = editSpeedDialCode
    ctrl.speedDial100 = {}
    ctrl.useFeatureAccessCodeLevels =
      GroupFeatureAccessCodesService.options.useFeatureAccessCodeLevel
    ctrl.speedDial100 = GroupSpeedDial100Service.options
    ctrl.columns = [
      {
        key: 'featureAccessCodeName',
        label: 'Name'
      },
      {
        key: 'mainCode',
        label: 'Main Code'
      },
      {
        key: 'alternateCode',
        label: 'Alternate Code'
      }
    ]

    function onInit() {
      ctrl.loading = true
      return $q
        .all([GroupPolicyService.load(), loadSettings(), loadSpeedDial100()])
        .then(function() {
          ctrl.canUpdate = GroupPolicyService.featureAccessCodeUpdate()
        })
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadData() {
      return $q
        .all([loadSettings(), loadSpeedDial100(), GroupPolicyService.load()])
        .then(function() {
          ctrl.canUpdate = GroupPolicyService.featureAccessCodeUpdate()
        })
    }

    function loadSpeedDial100() {
      return GroupSpeedDial100Service.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.speedDial100.settings = data
      })
    }

    function loadSettings() {
      return GroupFeatureAccessCodesService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        var sorted = _.sortBy(data.featureAccessCodes, [
          'featureAccessCodeName'
        ])
        ctrl.settings = data
        ctrl.settings.featureAccessCodes = sorted
        GroupPolicyService.load().then(function() {
          ctrl.canUpdate = GroupPolicyService.featureAccessCodeUpdate()
        })
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

    function reset() {
      Alert.confirm
        .open('Are you sure you want to reset the fac codes?')
        .then(function() {
          Alert.spinner.open()
          var obj = {}
          obj.serviceProviderId = ctrl.serviceProviderId
          obj.groupId = ctrl.groupId
          obj.restoreDefaultCodes = true

          GroupFeatureAccessCodesService.update(obj)
            .then(loadData)
            .then(function() {
              Alert.notify.success('Feature Access Codes Reset')
            })
            .catch(Alert.notify.danger)
            .finally(Alert.spinner.close)
        })
    }

    function editSpeedDialCode() {
      ctrl.editSpeedDial100 = angular.copy(ctrl.speedDial100.settings)
      Alert.modal.open('editSpeedDial100', function(close) {
        updateSpeedDial(ctrl.editSpeedDial100, close)
      })
    }
    function updateSpeedDial(settings, callback) {
      Alert.spinner.open()
      settings.serviceProviderId = ctrl.serviceProviderId
      settings.groupId = ctrl.groupId
      return GroupSpeedDial100Service.update(settings)
        .then(loadData)
        .then(function() {
          Alert.notify.success('Speed Dial 100 Prefix Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editFeatureAccessCodeLevel', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function updateCode(arr, origVal, newval) {
      var match = _.find(arr.featureAccessCodes, origVal)
      if (match) {
        var index = _.findIndex(arr.featureAccessCodes, origVal)
        arr.featureAccessCodes.splice(index, 1, newval)
      }
    }

    function update(settings, callback) {
      Alert.spinner.open()
      settings.serviceProviderId = ctrl.serviceProviderId
      settings.groupId = ctrl.groupId
      return GroupFeatureAccessCodesService.update(settings)
        .then(loadData)
        .then(function() {
          Alert.notify.success('Access Code Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
    function onClick(accessCode) {
      if (ctrl.canUpdate) {
        ctrl.editSettings = angular.copy(ctrl.settings)
        // make a copy of the original access code
        // let match = _.find(arr.featureAccessCodes, origVal)
        ctrl.editAccessCode = angular.copy(accessCode)
        ctrl.origAccessCode = angular.copy(accessCode)
        Alert.modal.open('editFeatureAccessCode', function(close) {
          updateCode(
            ctrl.editSettings,
            ctrl.origAccessCode,
            ctrl.editAccessCode
          )
          update(ctrl.editSettings, close)
        })
      }
    }
    function onSelect(event) {
      ctrl.selectFilter = {}
      // if (!ctrl.canUpdate) return
      ctrl.selected = event.length
      ctrl.editPolicies = {}
      // Alert.modal.open('update-GroupAdminBulk', function(close) {
      //   bulkUpdate(event, ctrl.editPolicies, close)
      // })
    }
  }
})()
