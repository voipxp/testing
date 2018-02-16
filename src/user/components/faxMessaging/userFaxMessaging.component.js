;(function() {
  angular.module('odin.user').component('userFaxMessaging', {
    templateUrl: 'user/components/faxMessaging/userFaxMessaging.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    Alert,
    UserService,
    UserFaxMessagingService,
    ACL,
    $q,
    GroupNumberService,
    GroupDomainService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.hasPermission = ACL.has
    ctrl.options = UserFaxMessagingService.options
    ctrl.setExtension = setExtension
    ctrl.mysplit = mysplit
    ctrl.shitsplit = shitsplit
    ctrl.domains = []

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.userId = $routeParams.userId

    function onInit() {
      ctrl.loading = true
      return loadSettings()
        .then(function() {
          return $q.all([loadDomains(), loadAvailableNumbers()])
        })
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return UserFaxMessagingService.show(ctrl.userId).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      console.log('ctrl.settings:', ctrl.settings)
      ctrl.editSettings = angular.copy(ctrl.settings)
      // console.log('ctrl.editSettings:', ctrl.editSettings)
      Alert.modal.open('editUserFaxMessaging', function onSave(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      console.log('settings', settings)
      UserFaxMessagingService.update(ctrl.userId, settings)
        .then(onInit)
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

    function loadDomains() {
      if (!ACL.has('Group')) {
        ctrl.domains = []
        return $q.resolve()
      }
      return GroupDomainService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.domains = data
        console.log('domains', data)
        return data
      })
    }

    function loadAvailableNumbers() {
      if (!ACL.has('Group')) {
        ctrl.availableNumbers = []
        return $q.resolve()
      }
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'available'
      ).then(function(data) {
        console.log('ctrl.settings.phoneNumber', ctrl.settings.phoneNumber)
        console.log('availableNumbers', data)
        ctrl.availableNumbers = data
        ctrl.availableNumbers.push({
          assigned: true,
          activated: true,
          min: ctrl.settings.phoneNumber,
          max: null
        })
        return ctrl.availableNumbers
      })
    }

    function setExtension() {
      var ext = ctrl.editSettings.phoneNumber
        ? ctrl.editSettings.phoneNumber.slice(-4)
        : null
      ctrl.editSettings.extension = ext
      console.log('setExtension', ctrl.editSettings.extension)
    }

    function shitsplit(input, splitChar) {
      return input.split(splitChar)
    }

    function mysplit(input, splitChar, splitIndex) {
      return input.split(splitChar)[splitIndex]
    }
  }
})()
