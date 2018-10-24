;(function() {
  angular.module('odin.user').component('userCallCenter', {
    templateUrl: 'user/components/callCenter/userCallCenter.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
  })

  function Controller(
    $q,
    Alert,
    UserCallCenterService,
    GroupCallCenterThresholdProfileService,
    EnterpriseCallCenterThresholdProfileService,
    Session,
    UserService,
    Module
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.editAvailability = editAvailability
    ctrl.canEditAvailability = canEditAvailability
    ctrl.canEditSkillLevel = canEditSkillLevel
    ctrl.isAdmin = isAdmin
    ctrl.options = UserCallCenterService.options
    ctrl.isEnterprise = false

    function onInit() {
      ctrl.loading = true
      $q.all([loadUser(), loadSettings(), loadDNIS(), loadModule()])
        .then(loadProfiles)
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadModule() {
      return Module.show('Call Center').then(function(data) {
        ctrl.module = data
      })
    }

    function loadUser() {
      return UserService.show(ctrl.userId).then(function(data) {
        ctrl.isEnterprise = data.isEnterprise
      })
    }

    function loadSettings() {
      return UserCallCenterService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function loadProfiles() {
      if (!isAdmin()) return $q.resolve()
      var model = ctrl.isEnterprise
        ? EnterpriseCallCenterThresholdProfileService
        : GroupCallCenterThresholdProfileService
      return model
        .index(ctrl.serviceProviderId, ctrl.groupId)
        .catch(function() {
          ctrl.profiles = false
        })
        .then(function(data) {
          ctrl.profiles = data
        })
    }

    function loadDNIS() {
      return UserCallCenterService.dnis(ctrl.userId).then(function(data) {
        ctrl.dnis = data.dnis
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      // We aren't updated callCenters here
      delete ctrl.editSettings.callCenters
      Alert.modal.open('editUserCallCenterSettings', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function isAdmin() {
      return Session.data('loginType') !== 'User'
    }

    function canEditAvailability(center) {
      if (!center) return
      return isAdmin() || center.logoffAllowed
    }

    function canEditSkillLevel(center) {
      if (!center) return
      return isAdmin() && center.routingType === 'Skill Based'
    }

    function editAvailability(center) {
      if (!canEditAvailability(center)) return
      var editSettings = angular.copy(ctrl.settings)
      ctrl.editCenter = _.find(editSettings.callCenters, {
        serviceUserId: center.serviceUserId
      })
      // USERS CANNOT CHANGE THEIR OWN SKILL LEVEL
      // REMOVE SO WE DON'T SEND TO API
      if (!isAdmin()) {
        delete ctrl.editCenter.skillLevel
      }
      Alert.modal.open(
        'editUserCallCenterSettingsAvailability',
        function onSave(close) {
          editSettings.callCenters = [ctrl.editCenter]
          update(editSettings, close)
        }
      )
    }

    function update(settings, callback) {
      Alert.spinner.open()
      UserCallCenterService.update(ctrl.userId, settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          if (_.isFunction(callback)) callback()
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
