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
    ctrl.editTitle = {}
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
        return _.map(data.dns, function(number) {
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
      var numbers = NumberService.expand(number)
      ctrl.editNumbers = {
        available: _.filter(numbers, function(_number) {
          return !_number.activated
        }),
        selected: _.filter(numbers, function(_number) {
          return _number.activated
        })
      }
      ctrl.editTitle = { available: 'Deactivated', selected: 'Activated' }
      ctrl.action = 'Edit Number Activation'
      Alert.modal.open('groupNumbersEditModal', function(close) {
        var toDeactivate = _.map(ctrl.editNumbers.available, function(_number) {
          _number.activated = false
          return _number
        })
        var toActivate = _.map(ctrl.editNumbers.selected, function(_number) {
          _number.activated = true
          return _number
        })
        return update(toDeactivate.concat(toActivate), close)
      })
    }

    function add() {
      Alert.spinner.open()
      loadAvailableNumbers()
        .then(function(numbers) {
          ctrl.editNumbers = {
            available: numbers,
            selected: []
          }
          ctrl.editTitle = {
            available: 'Unassigned',
            selected: 'To Assign'
          }
          ctrl.action = 'Assign Numbers'
          Alert.modal.open('groupNumbersEditModal', function onSave(close) {
            assignNumbers(ctrl.editNumbers.selected, close)
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
      var action
      ctrl.editNumbers = {
        available: NumberService.expand(numbers),
        selected: []
      }
      if (ctrl.action === 'Unassign Numbers') {
        ctrl.editTitle = {
          available: 'Assigned',
          selected: 'To Unassign'
        }
        action = unassignNumbers
      } else if (ctrl.action === 'Activate Numbers') {
        ctrl.editTitle = {
          available: 'Deactivated',
          selected: 'To Activate'
        }
        action = activateNumbers
      } else if (ctrl.action === 'Deactivate Numbers') {
        ctrl.editTitle = {
          available: 'Activated',
          selected: 'To Deactivate'
        }
        action = deactivateNumbers
      }
      Alert.modal.open('groupNumbersEditModal', function onSave(close) {
        action(ctrl.editNumbers.selected, close)
      })
    }

    function update(numbers, callback) {
      Alert.spinner.open()
      return GroupNumberService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
        numbers
      )
        .then(loadNumbers)
        .then(function() {
          ctrl.filter = {}
          Alert.notify.success('Activations Updated')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function activateNumbers(numbers, callback) {
      var editNumbers = angular.copy(numbers)
      editNumbers.forEach(function(number) {
        number.activated = true
      })
      update(editNumbers, callback)
    }

    function deactivateNumbers(numbers, callback) {
      var editNumbers = angular.copy(numbers)
      editNumbers.forEach(function(number) {
        number.activated = false
      })
      update(editNumbers, callback)
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

    function unassignNumbers(numbers, callback) {
      Alert.spinner.open()
      GroupNumberService.unassign(ctrl.serviceProviderId, ctrl.groupId, numbers)
        .then(loadNumbers)
        .then(function() {
          ctrl.filter = {}
          Alert.notify.success('Numbers Unassigned')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()
