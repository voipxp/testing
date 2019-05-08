;(function() {
  angular.module('odin.group').component('groupCallCenterDistinctiveRinging', {
    templateUrl:
      'group/components/callCenters/callCenter/advanced/distinctiveRinging.component.html',
    controller: Controller,
    bindings: { serviceUserId: '<' }
  })

  function Controller(GroupCallCenterDistinctiveRingingService, Alert) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.options = GroupCallCenterDistinctiveRingingService.options

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
      return GroupCallCenterDistinctiveRingingService.show(
        ctrl.serviceUserId
      ).then(function(data) {
        console.log('distinctiveRinging', data)
        ctrl.service = data
      })
    }

    function edit() {
      ctrl.editService = angular.copy(ctrl.service)
      Alert.modal.open('editGroupCallCenterDistinctiveRinging', function onSave(
        close
      ) {
        update(ctrl.editService, close)
      })
    }

    function update(service, callback) {
      Alert.spinner.open()
      GroupCallCenterDistinctiveRingingService.update(
        ctrl.serviceUserId,
        service
      )
        .then(loadService)
        .then(function() {
          Alert.notify.success('Distinctive Ringing Updated')
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