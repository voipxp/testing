;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderNumbers', {
    templateUrl: 'serviceProvider/components/numbers/numbers.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    ServiceProviderNumberService,
    NumberService,
    $routeParams,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.add = add
    ctrl.edit = edit
    ctrl.remove = remove

    function onInit() {
      ctrl.loading = true
      ctrl.canUpdate = ACL.has('Provisioning')
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
          ctrl.numbers = _.map(data, function(number) {
            number.expanded = _.map(NumberService.expand(number), 'min')
            return number
          })
        }
      )
    }

    function add() {
      if (!ctrl.canUpdate) return
      ctrl.newNumber = {}
      Alert.modal.open('serviceProviderNumbersCreateModal', function(close) {
        create(ctrl.newNumber, close)
      })
    }

    function edit(number) {
      if (!ctrl.canUpdate || number.groupId) return
      ctrl.editNumbers = {
        available: [],
        selected: NumberService.expand(number)
      }
      Alert.modal.open('serviceProviderNumbersEditModal', function(close) {
        if (ctrl.editNumbers.available.length < 1) return close()
        remove(ctrl.editNumbers.available, close)
      })
    }

    function create(number, callback) {
      Alert.spinner.open()
      ServiceProviderNumberService.store(ctrl.serviceProviderId, [number])
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Number Added')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }

    function remove(numbers, callback) {
      Alert.spinner.open()
      ServiceProviderNumberService.destroy(ctrl.serviceProviderId, numbers)
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Number Removed')
          callback()
        })
        .catch(Alert.notify.danger)
        .finally(Alert.spinner.close)
    }
  }
})()