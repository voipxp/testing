;(function() {
  angular.module('odin.serviceProvider').component('serviceProviderMeetMe', {
    templateUrl: 'serviceProvider/components/meetMe/meetMe.component.html',
    controller: Controller,
    bindings: { module: '<' }
  })

  function Controller(
    $routeParams,
    Alert,
    Route,
    ServiceProviderMeetMeConferencingPortsService
  ) {
    var ctrl = this

    ctrl.serviceProviderId = $routeParams.serviceProviderId
    ctrl.edit = edit
    ctrl.update = update
    ctrl.$onInit = activate

    function activate() {
      ctrl.loading = true
      return loadPorts()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function loadPorts() {
      return ServiceProviderMeetMeConferencingPortsService.show(
        ctrl.serviceProviderId
      ).then(function(data) {
        ctrl.ports = data
        return data
      })
    }

    function edit() {
      ctrl.editPorts = angular.copy(ctrl.ports)
      Alert.modal.open('edit-PortAllocation', function onSave(close) {
        return update(close)
      })
    }

    function update(callback) {
      Alert.spinner.open()
      return ServiceProviderMeetMeConferencingPortsService.update(
        ctrl.serviceProviderId,
        ctrl.editPorts
      )
        .then(loadPorts)
        .then(function() {
          Alert.notify.success('Meet-Me Settings Saved')
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
  }
})()
