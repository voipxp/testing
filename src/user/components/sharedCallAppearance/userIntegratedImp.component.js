;(function() {
  angular.module('odin.user').component('userIntegratedImp', {
    templateUrl:
      'user/components/sharedCallAppearance/userIntegratedImp.component.html',
    controller: Controller,
    bindings: {
      userId: '<'
    }
  })

  function Controller(Alert, UserIntegratedIMPService, UserServiceService) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.$onChanges = onChanges
    ctrl.edit = edit
    ctrl.isAssigned = isAssigned

    function onInit() {
      ctrl.loading = true
      return loadServices()
        .then(function() {
          if (isAssigned()) return loadIntegratedImp()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function onChanges(changes) {
      if (changes.userId) {
        ctrl.userId = changes.userId.currentValue
      }
    }

    function loadIntegratedImp() {
      return UserIntegratedIMPService.show(ctrl.userId).then(function(data) {
        ctrl.integratedImp = data
        console.log('integratedImp ', data)
      })
    }

    function loadServices() {
      return UserServiceService.assigned(ctrl.userId).then(function(data) {
        ctrl.assignedServices = data
        console.log('assignedServices', ctrl.assignedServices)
      })
    }

    function isAssigned() {
      if (!ctrl.assignedServices) return
      return _.find(ctrl.assignedServices.userServices, {
        serviceName: 'Integrated IMP'
      })
    }

    function edit() {
      if (!isAssigned()) {
        Alert.notify.danger(
          'Integrated IMP must be assigned before it can be enabled'
        )
        return
      }
      ctrl.editIntegratedImp = angular.copy(ctrl.integratedImp)
      Alert.modal.open('userIntegratedImpEditModal', function onSave(close) {
        update(ctrl.editIntegratedImp, close)
      })
    }

    function update(service, callback) {
      Alert.spinner.open()

      UserIntegratedIMPService.update(ctrl.userId, service)
        .then(loadIntegratedImp)
        .then(function() {
          Alert.notify.success('Integrated Imp Updated')
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
  }
})()
