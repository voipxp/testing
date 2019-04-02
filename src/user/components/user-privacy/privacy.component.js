;(function() {
  angular.module('odin.user').component('userPrivacy', {
    templateUrl: 'user/components/privacy/privacy.component.html',
    controller: Controller,
    bindings: { userId: '<' }
  })

  function Controller(Alert, UserPrivacyService, $q) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.editMonitors = editMonitors

    ctrl.columns = [
      {
        key: 'userId',
        label: 'User ID'
      },
      {
        key: 'lastName',
        label: 'Last Name'
      },
      {
        key: 'firstName',
        label: 'First Name'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number'
      },
      {
        key: 'extension',
        label: 'Extension'
      },
      {
        key: 'department',
        label: 'Department'
      }
    ]

    ctrl.schema = {
      title: 'User Privacy Settings',
      type: 'object',
      required: [],
      properties: {
        enableDirectoryPrivacy: {
          title: 'Directory Privacy',
          type: 'boolean'
        },
        enableAutoAttendantExtensionDialingPrivacy: {
          title: 'Auto Attendant Extension Dialing Privacy',
          type: 'boolean'
        },
        enableAutoAttendantNameDialingPrivacy: {
          title: 'Auto Attendant Name Dialing Privacy',
          type: 'boolean'
        },
        enablePhoneStatusPrivacy: {
          title: 'Phone Status Privacy',
          type: 'boolean'
        }
      }
    }

    function onInit() {
      ctrl.loading = true
      return loadData()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadData() {
      return $q.all([loadSettings(), loadAvailable()])
    }

    function loadAvailable() {
      return UserPrivacyService.available(ctrl.userId).then(function(data) {
        ctrl.available = data
      })
    }

    function loadSettings() {
      return UserPrivacyService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editUserPrivacySettings', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function editMonitors() {
      ctrl.selectedMonitors = ctrl.settings.permittedMonitors
      ctrl.availableMonitors = _.filter(ctrl.available, function(user) {
        return !_.find(ctrl.selectedMonitors, { userId: user.userId })
      })
      Alert.modal.open('editUserPrivacyMonitors', function(close) {
        ctrl.editSettings = angular.copy(ctrl.settings)
        ctrl.editSettings.permittedMonitors = ctrl.selectedMonitors
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      return UserPrivacyService.update(settings)
        .then(loadData)
        .then(function() {
          Alert.notify.success('Profile Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
