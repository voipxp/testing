;(function() {
  angular.module('odin.group').component('groupCallCenterForcedForwarding', {
    templateUrl:
      'group/components/callCenters/callCenter/routing/forcedForwarding.component.html',
    controller: Controller,
    bindings: { serviceUserId: '<' }
  })

  function Controller(GroupCallCenterForcedForwardingService, Alert) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit

    function onInit() {
      ctrl.loading = true
      loadService()
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

    function loadService() {
      return GroupCallCenterForcedForwardingService.show(
        ctrl.serviceUserId
      ).then(function(data) {
        console.log('forcedForwarding', data)
        ctrl.service = data
      })
    }

    function edit() {
      ctrl.editService = angular.copy(ctrl.service)
      Alert.modal.open('editGroupCallCenterForcedForwarding', function onSave(
        close
      ) {
        update(ctrl.editService, close)
      })
    }

    function update(service, callback) {
      Alert.spinner.open()
      GroupCallCenterForcedForwardingService.update(ctrl.serviceUserId, service)
        .then(loadService)
        .then(function() {
          Alert.notify.success('Forced Forwarding Updated')
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
