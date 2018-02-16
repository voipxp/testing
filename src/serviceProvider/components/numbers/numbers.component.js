;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderNumbers', {
    templateUrl: 'serviceProvider/components/numbers/numbers.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    ServiceProviderNumberService,
    NumberService,
    $routeParams
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.add = add
    ctrl.edit = edit
    ctrl.remove = remove
    ctrl.filterStatus = filterStatus
    ctrl.search = {}

    function onInit() {
      ctrl.loading = true
      return loadNumbers()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadNumbers() {
      return ServiceProviderNumberService.index(ctrl.serviceProviderId).then(
        function(data) {
          console.log('numbers', data)
          ctrl.numbers = data
          return data
        }
      )
    }

    function add() {
      ctrl.newNumber = {}
      Alert.modal.open('serviceProviderNumbersCreateModal', function(close) {
        create(ctrl.newNumber, close)
      })
    }

    function edit(number) {
      ctrl.selectedNumbers = NumberService.expand(number)
      Alert.modal.open(
        'serviceProviderNumbersEditModal',
        function onSave(close) {
          close()
        },
        function onDelete(close) {
          remove(number, close)
        }
      )
    }

    function create(number, callback) {
      Alert.spinner.open()
      ServiceProviderNumberService.store(ctrl.serviceProviderId, [number])
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Number Added')
          callback()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function remove(number, callback) {
      var numberType = number.max ? 'range of numbers' : 'number'
      Alert.confirm
        .open('Are you sure you want to delete this ' + numberType + '?')
        .then(function() {
          Alert.spinner.open()
          ServiceProviderNumberService.destroy(ctrl.serviceProviderId, [number])
            .then(loadNumbers)
            .then(function() {
              _.remove(ctrl.selectedNumbers, number)
              Alert.notify.success('Number Removed')
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
        })
    }

    function filterStatus(item) {
      ctrl.search.status = ctrl.search.status || 'all'
      if (ctrl.search.status === 'available') {
        return !item.groupId
      } else if (ctrl.search.status === 'assigned') {
        return item.groupId
      } else {
        return true
      }
    }
  }
})()
