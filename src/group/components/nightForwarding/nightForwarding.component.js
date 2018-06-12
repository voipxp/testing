;(function() {
  angular.module('odin.group').component('groupNightForwarding', {
    templateUrl:
      'group/components/nightForwarding/nightForwarding.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller($routeParams, Alert, GroupNightForwardingService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.edit = edit
    ctrl.options = GroupNightForwardingService.options

    function onInit() {
      ctrl.loading = true
      return load()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function load() {
      return GroupNightForwardingService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('data', data)
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      console.log('ctrl.editSettings', ctrl.editSettings)
      Alert.modal.open('editGroupNightForwardingModal', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      settings.serviceProviderId = ctrl.serviceProviderId
      settings.groupId = ctrl.groupId
      GroupNightForwardingService.update(settings)
        .then(load)
        .then(function() {
          Alert.notify.success('Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
