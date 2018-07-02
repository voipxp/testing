;(function() {
  angular.module('odin.group').component('groupCallCenterBouncedCalls', {
    templateUrl:
      'group/components/callCenters/callCenter/routing/bouncedCalls.component.html',
    controller: Controller,
    bindings: { serviceUserId: '<', type: '<' }
  })

  function Controller(GroupCallCenterBouncedCallService, Alert) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.options = GroupCallCenterBouncedCallService.options
    ctrl.hasPremium = function() {
      return ctrl.type === 'Premium'
    }
    ctrl.hasStandard = function() {
      return ctrl.type === 'Standard' || ctrl.hasPremium()
    }

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
      return GroupCallCenterBouncedCallService.show(ctrl.serviceUserId).then(
        function(data) {
          console.log('bouncedCall', data)
          ctrl.service = data
        }
      )
    }

    function edit() {
      ctrl.editService = angular.copy(ctrl.service)
      Alert.modal.open('editGroupCallCenterBouncedCalls', function(close) {
        update(ctrl.editService, close)
      })
    }

    function update(service, callback) {
      console.log('GroupCallCenterBouncedCallService', service)
      Alert.spinner.open()
      GroupCallCenterBouncedCallService.update(ctrl.serviceUserId, service)
        .then(loadService)
        .then(function() {
          Alert.notify.success('Bounced Calls Updated')
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
