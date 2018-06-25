;(function() {
  angular.module('odin.bulk').component('bulkSelectExistingNumbers', {
    templateUrl:
      'bulk/components/selectNumbers/bulkSelectExistingNumbers.component.html',
    controller: Controller,
    bindings: {
      serviceProviderId: '<',
      groupId: '<',
      userCount: '<',
      phoneNumbers: '<',
      onUpdate: '&'
    }
  })

  function Controller(
    Alert,
    GroupNumberService,
    EventEmitter,
    HashService,
    $scope
  ) {
    var ctrl = this
    ctrl.$onInit = onInit

    // select numbers
    ctrl.add = add
    ctrl.remove = remove
    ctrl.autoFill = autoFill

    function onInit() {
      ctrl.modalId = HashService.guid()
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'available'
      )
    }

    function open() {
      Alert.spinner.open()
      loadNumbers()
        .then(function(data) {
          console.log('numbers', data)
          if (data.length < ctrl.userCount) {
            throw 'Not enough numbers available'
          }
          // set the number we already have selected
          ctrl.selectedNumbers = angular.copy(ctrl.phoneNumbers) || []
          // remove already selected numbers
          var available = _.filter(data, function(number) {
            return ctrl.selectedNumbers.indexOf(number.min) === -1
          })
          ctrl.availableNumbers = _.map(available, 'min')
          setCount()
          Alert.modal.open(ctrl.modalId, function(close) {
            sendUpdate(ctrl.selectedNumbers)
            close()
          })
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          sendUpdate([])
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function autoFill() {
      for (var i = ctrl.selectedNumbers.length; i < ctrl.userCount; i++) {
        ctrl.add(ctrl.availableNumbers[0])
      }
    }

    // hack for modal validation
    function setCount() {
      ctrl.selectedCount = ctrl.selectedNumbers.length
    }

    function add(number) {
      if (ctrl.selectedNumbers.length === ctrl.userCount) return
      _.pull(ctrl.availableNumbers, number)
      ctrl.selectedNumbers.push(number)
      setCount()
    }

    function remove(number) {
      _.pull(ctrl.selectedNumbers, number)
      ctrl.availableNumbers.push(number)
      setCount()
    }

    function sendUpdate(numbers) {
      ctrl.onUpdate(EventEmitter({ phoneNumbers: numbers }))
    }

    $scope.$on('bulkSelectExistingNumbers:load', open)
  }
})()
