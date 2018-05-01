;(function() {
  angular.module('odin.group').component('groupNumbers', {
    templateUrl: 'group/components/numbers/numbers.component.html',
    controller: Controller
  })

  function Controller(
    $routeParams,
    Alert,
    ServiceProviderNumberService,
    GroupNumberService,
    NumberService
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.add = add
    ctrl.edit = edit
    ctrl.toggle = toggle

    function onInit() {
      ctrl.loading = true
      loadNumbers()
        .catch(Alert.notify.danger)
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        console.log('numbers', data)
        ctrl.numbers = data
      })
    }

    function loadAvailableNumbers() {
      return ServiceProviderNumberService.index(
        ctrl.serviceProviderId,
        'available'
      )
    }

    function add() {
      Alert.spinner.open()
      loadAvailableNumbers()
        .then(function(numbers) {
          ctrl.addNumbers = {
            unassigned: NumberService.expand(numbers),
            assign: []
          }
          Alert.modal.open('groupNumbersAddModal', function onSave(close) {
            assignNumbers(ctrl.addNumbers.assign, close)
          })
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function edit(number) {
      if (number.assigned) return
      ctrl.editNumbers = {
        assigned: NumberService.expand(number),
        unassign: []
      }
      Alert.modal.open('groupNumbersEditModal', function onSave(close) {
        unassignNumbers(ctrl.editNumbers.unassign, close)
      })
    }

    function toggle(number) {
      number.isLoading = true
      GroupNumberService.update(ctrl.serviceProviderId, ctrl.groupId, [number])
        .then(function() {
          if (number.activated) {
            Alert.notify.success('Number Activated')
          } else {
            Alert.notify.warning('Number Deactivated')
          }
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          number.activated = !number.activated
        })
        .finally(loadNumbers)
    }

    function assignNumbers(numbers, callback) {
      Alert.spinner.open()
      GroupNumberService.assign(ctrl.serviceProviderId, ctrl.groupId, numbers)
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Numbers Assigned')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function unassignNumbers(numbers, callback) {
      Alert.spinner.open()
      GroupNumberService.unassign(ctrl.serviceProviderId, ctrl.groupId, numbers)
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Numbers Unassigned')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
