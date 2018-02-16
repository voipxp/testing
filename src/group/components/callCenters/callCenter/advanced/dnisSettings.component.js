;(function() {
  angular.module('odin.group').component('groupCallCenterDnisSettings', {
    templateUrl:
      'group/components/callCenters/callCenter/advanced/dnisSettings.component.html',
    controller: Controller,
    bindings: {
      serviceUserId: '<',
      dnisId: '<',
      serviceProviderId: '<',
      groupId: '<'
    }
  })

  function Controller(
    $routeParams,
    Route,
    $location,
    Alert,
    GroupCallCenterDnisInstanceService,
    $q,
    GroupNumberService
  ) {
    var ctrl = this

    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.setExtension = setExtension
    ctrl.options = GroupCallCenterDnisInstanceService.options

    function onInit() {
      ctrl.loading = true
      loadDnis()
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
      if (changes.dnisId) {
        ctrl.dnisId = changes.dnisId.currentValue
      }
      if (changes.serviceProviderId) {
        ctrl.serviceProviderId = changes.serviceProviderId.currentValue
      }
      if (changes.groupId) {
        ctrl.groupId = changes.groupId.currentValue
      }
    }

    function loadDnis() {
      return GroupCallCenterDnisInstanceService.show(
        ctrl.serviceUserId,
        ctrl.dnisId
      ).then(function(data) {
        ctrl.service = data
        console.log('dnis', data)
        return data
      })
    }

    function loadNumbers() {
      if (ctrl.numbers) {
        return $q.when(ctrl.numbers)
      }
      Alert.spinner.open()
      return loadAvailableNumbers()
        .catch(function(error) {
          Alert.notify.danger(error)
          return $q.reject(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function loadAvailableNumbers() {
      return GroupNumberService.index(
        ctrl.serviceProviderId,
        ctrl.groupId,
        'available'
      ).then(function(data) {
        ctrl.numbers = data
        ctrl.numbers.unshift({ min: ctrl.service.dnisPhoneNumber })
      })
    }

    function edit() {
      ctrl.changeName = false
      loadNumbers().then(function() {
        ctrl.editService = angular.copy(ctrl.service)
        Alert.modal.open(
          'editGroupCallCenterDnisInstance',
          function onSave(close) {
            update(ctrl.editService, close)
          },
          function onDelete(close) {
            Alert.confirm
              .open('Are you sure you want to delete this DNIS?')
              .then(function() {
                destroy(ctrl.editService, close)
              })
          }
        )
      })
    }

    function update(dnis, callback) {
      Alert.spinner.open()
      GroupCallCenterDnisInstanceService.update(
        ctrl.serviceUserId,
        ctrl.dnisId,
        dnis
      )
        .then(loadDnis)
        .then(function() {
          Alert.notify.success('DNIS Instance Updated')
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

    function setExtension() {
      if (!ctrl.editService.dnisPhoneNumber) {
        ctrl.editService.extension = null
      } else {
        ctrl.editService.extension = ctrl.editService.dnisPhoneNumber.slice(-4)
      }
    }

    function destroy(dnis, callback) {
      Alert.spinner.open()
      GroupCallCenterDnisInstanceService.destroy(
        ctrl.serviceUserId,
        ctrl.dnisId
      )
        .then(function() {
          Alert.notify.success('DNIS Instance Removed')
          if (_.isFunction(callback)) {
            callback()
          }
          $location.hash('Advanced')
          Route.open(
            'callCenter',
            ctrl.serviceProviderId,
            ctrl.groupId
          )(ctrl.serviceUserId)
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
