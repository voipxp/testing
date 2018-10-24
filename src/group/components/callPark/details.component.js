;(function() {
  angular.module('odin.group').component('groupCallParkDetails', {
    templateUrl: 'group/components/callPark/details.component.html',
    controller: Controller,
    bindings: { module: '<', serviceProviderId: '<', groupId: '<' }
  })

  function Controller(Alert, GroupCallParkService, $routeParams) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId

    ctrl.edit = edit
    ctrl.options = GroupCallParkService.options

    function onInit() {
      ctrl.loading = true
      loadSettings()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadSettings() {
      return GroupCallParkService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.settings = data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('groupCallParkDetailsEditModal', function(close) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      GroupCallParkService.update(settings)
        .then(loadSettings)
        .then(function() {
          Alert.notify.success('Settings Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
