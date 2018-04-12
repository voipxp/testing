;(function() {
  angular.module('odin.common').component('selectPhoneNumber', {
    templateUrl:
      'common/components/selectPhoneNumber/selectPhoneNumber.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      phoneNumber: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    Alert,
    NumberService,
    GroupNumberService,
    EventEmitter,
    HashService
  ) {
    var ctrl = this
    ctrl.numbers = []
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.select = select

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function edit() {
      Alert.spinner.open()
      loadNumbers()
        .then(function() {
          ctrl.search = ''
          Alert.modal.open(ctrl.modalId)
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function select(phoneNumber) {
      if (phoneNumber) {
        phoneNumber.isSelected = true
      }
      Alert.modal.close(ctrl.modalId)
      ctrl.onUpdate(EventEmitter({ phoneNumber: phoneNumber }))
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'available'
      ).then(function(data) {
        ctrl.numbers = NumberService.expand(data)
        if (ctrl.phoneNumber) {
          var myNumber = _.find(ctrl.numbers, { min: ctrl.phoneNumber })
          if (!myNumber) {
            ctrl.numbers.push({ min: ctrl.phoneNumber })
          }
        }
        return ctrl.numbers
      })
    }
  }
})()
