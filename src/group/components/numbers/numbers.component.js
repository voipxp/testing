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
    $q
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.assign = assign
    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.groupId = $routeParams.groupId
    ctrl.toggle = toggle
    ctrl.filterStatus = filterStatus

    function onInit() {
      ctrl.loading = true
      loadNumbers()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        // console.log('numbers', data);
        ctrl.numbers = data
        return data
      })
    }

    function loadAvailableNumbers() {
      Alert.spinner.open()
      return ServiceProviderNumberService.index(
        ctrl.serviceProviderId,
        'available'
      )
        .then(function(data) {
          // console.log('availableNumbers', data);
          ctrl.availableNumbers = data
          return data
        })
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function numberName(number) {
      if (!number) return
      return number.max ? number.min + ' - ' + number.max : number.min
    }

    function edit(number) {
      ctrl.editNumber = angular.copy(number)
      ctrl.modalTitle = numberName(number)
      Alert.modal.open(
        'edit-groupNumbers',
        function onSave(close) {
          if (!ctrl.editNumber.activated && number.activated) {
            var message = 'Are you sure you want to deactivate this DN?'
            Alert.confirm.open(message).then(function() {
              update(ctrl.editNumber, close)
            })
          } else {
            update(ctrl.editNumber, close)
          }
        },
        function onDelete(close) {
          unassign(number, close)
        }
      )
    }

    function update(number, callback) {
      Alert.spinner.open()
      GroupNumberService.update(ctrl.serviceProviderId, ctrl.groupId, [number])
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Number Updated')
          callback()
        })
        .catch(function(error) {
          console.log('error', error)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function assign() {
      loadAvailableNumbers().then(function() {
        Alert.modal.open('assign-GroupNumbers', function onSave(close) {
          var toAssign = _.filter(ctrl.availableNumbers, 'groupId')
          assignNumbers(toAssign, close)
        })
      })
    }

    function assignNumbers(numbers, callback) {
      Alert.spinner.open()
      console.log('assigning', numbers)
      GroupNumberService.assign(ctrl.serviceProviderId, ctrl.groupId, numbers)
        .then(loadNumbers)
        .then(function() {
          Alert.notify.success('Numbers Assigned')
          callback()
        })
        .catch(function(error) {
          console.log('error', error.data)
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function unassign(number, callback) {
      var message =
        'Are you sure you want to release this number from the Group?'
      Alert.confirm.open(message).then(function() {
        Alert.spinner.open()
        GroupNumberService.unassign(ctrl.serviceProviderId, ctrl.groupId, [
          number
        ])
          .then(loadNumbers)
          .then(function() {
            Alert.notify.success('Number Released')
            callback()
          })
          .catch(function(error) {
            Alert.notify.danger(error)
          })
          .finally(function() {
            Alert.spinner.close()
          })
      })
    }

    function toggle(number) {
      number.groupId = number.groupId ? null : ctrl.groupId
    }

    function filterStatus(item) {
      ctrl.status = ctrl.status || 'all'
      if (ctrl.status === 'activated') {
        return item.activated
      } else if (ctrl.status === 'assigned') {
        return item.assigned
      } else {
        return true
      }
    }
  }
})()
