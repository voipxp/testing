;(function() {
  angular.module('odin.group').component('groupFeatureAccessCodes', {
    templateUrl:
      'group/components/featureAccessCodes/featureAccessCodes.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, GroupFeatureAccessCodesService, $q) {
    let ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.onClick = onClick
    ctrl.onSelect = onSelect
    ctrl.toggleSelect = toggleSelect
    ctrl.useFeatureAccessCodeLevels =
      GroupFeatureAccessCodesService.options.useFeatureAccessCodeLevel
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
      return loadData()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadData() {
      return $q.all([loadSettings()])
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

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editFeatureAccessCodeLevel', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    let updateCode = function(arr, origVal, newval) {
      let match = _.find(arr.featureAccessCodes, origVal)
      if (match) {
        let index = _.findIndex(arr.featureAccessCodes, origVal)
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
      ctrl.editSettings = angular.copy(ctrl.settings)
      ctrl.editAccessCode = angular.copy(accessCode)
      ctrl.origAccessCode = angular.copy(accessCode)
      Alert.modal.open('editFeatureAccessCode', function(close) {
        updateCode(ctrl.editSettings, ctrl.origAccessCode, ctrl.editAccessCode)
        update(ctrl.editSettings, close)
      })
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
