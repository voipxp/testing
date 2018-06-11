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
    ctrl.filter = {}
    ctrl.toggleFilter = toggleFilter
    ctrl.select = select
    ctrl.onSelect = onSelect
    ctrl.onClick = onClick

    ctrl.actions = [
      'Unassign Numbers',
      'Activate Numbers',
      'Deactivate Numbers'
    ]

    ctrl.columns = [
      {
        key: 'min',
        label: 'Range Start'
      },
      {
        key: 'max',
        label: 'Range End'
      },
      {
        key: 'assigned',
        label: 'Assigned',
        type: 'boolean',
        align: 'centered'
      },
      {
        key: 'activated',
        label: 'Activated',
        type: 'boolean',
        align: 'centered'
      }
    ]

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
        ctrl.numbers = _.map(data, function(number) {
          number.expanded = _.map(NumberService.expand(number), 'min')
          return number
        })
      })
    }

    function loadAvailableNumbers() {
      return ServiceProviderNumberService.index(
        ctrl.serviceProviderId,
        'available'
      ).then(function(data) {
        return _.map(data, function(number) {
          number.expanded = _.map(NumberService.expand(number), 'min')
          return number
        })
      })
    }

    function toggleFilter(type) {
      if (type === 'assigned') {
        ctrl.filter.assigned = ctrl.filter.assigned === true ? undefined : true
      } else if (type === 'unassigned') {
        ctrl.filter.assigned =
          ctrl.filter.assigned === false ? undefined : false
      } else if (type === 'activated') {
        ctrl.filter.activated =
          ctrl.filter.activated === true ? undefined : true
        if (ctrl.filter.assigned === false) {
          ctrl.filter.assigned = undefined
        }
      } else if (type === 'deactivated') {
        ctrl.filter.activated =
          ctrl.filter.activated === false ? undefined : false
      }
    }

    function onClick(number) {
      ctrl.editNumbers = {
        unassign: [],
        assigned: NumberService.expand(number)
      }
      Alert.modal.open('groupNumbersEditModal', function(close) {
        if (ctrl.editNumbers.unassign.length < 1) return close()
        return unassignNumbers(ctrl.editNumbers.unassign)
      })
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

    function select(event) {
      ctrl.action = event
      if (event === 'Unassign Numbers') {
        ctrl.filter = { assigned: false }
      } else if (event === 'Activate Numbers') {
        ctrl.filter = { activated: false }
      } else if (event === 'Deactivate Numbers') {
        ctrl.filter = { activated: true }
      } else {
        return
      }
      ctrl.showSelect = true
    }

    function onSelect(numbers) {
      if (ctrl.action === 'Unassign Numbers') {
        unassignNumbers(numbers)
      } else if (ctrl.action === 'Activate Numbers') {
        activateNumbers(numbers)
      } else if (ctrl.action === 'Deactivate Numbers') {
        deactivateNumbers(numbers)
      }
    }

    function update(numbers, action) {
      var message =
        'Are you sure you want to ' +
        action +
        ' these ' +
        numbers.length +
        ' numbers?'
      Alert.confirm.open(message).then(function() {
        Alert.spinner.open()
        return GroupNumberService.update(
          ctrl.serviceProviderId,
          ctrl.groupId,
          numbers
        )
          .then(loadNumbers)
          .then(function() {
            ctrl.filter = {}
            Alert.notify.success(ctrl.action + ' Completed')
          })
          .catch(Alert.notify.danger)
          .finally(Alert.spinner.close)
      })
    }

    function activateNumbers(numbers) {
      var editNumbers = angular.copy(numbers)
      editNumbers.forEach(function(number) {
        number.activated = true
      })
      update(editNumbers, 'Activate')
    }

    function deactivateNumbers(numbers) {
      var editNumbers = angular.copy(numbers)
      editNumbers.forEach(function(number) {
        number.activated = false
      })
      update(editNumbers, 'Deactivate')
    }

    function assignNumbers(numbers, callback) {
      Alert.spinner.open()
      GroupNumberService.assign(ctrl.serviceProviderId, ctrl.groupId, numbers)
        .then(loadNumbers)
        .then(function() {
          ctrl.filter = {}
          Alert.notify.success('Numbers Assigned')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function unassignNumbers(numbers) {
      var message =
        'Are you sure you want to Unassign these ' +
        numbers.length +
        ' numbers?'
      Alert.confirm.open(message).then(function() {
        Alert.spinner.open()
        GroupNumberService.unassign(
          ctrl.serviceProviderId,
          ctrl.groupId,
          numbers
        )
          .then(loadNumbers)
          .then(function() {
            ctrl.filter = {}
            Alert.notify.success('Numbers Unassigned')
          })
          .catch(Alert.notify.danger)
          .finally(Alert.spinner.close)
      })
    }
  }
})()
