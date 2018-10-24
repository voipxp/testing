;(function() {
  angular
    .module('odin.serviceProvider')
    .component('serviceProviderTrunkGroupsCallCapacity', {
      templateUrl:
        'serviceProvider/components/trunkGroups/callCapacity.component.html',
      controller: Controller,
      bindings: { serviceProviderId: '<', module: '<' }
    })

  function Controller(
    Alert,
    ServiceProviderTrunkGroupCallCapacityService,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = onInit
    ctrl.edit = edit
    ctrl.displayMax = displayMax
    ctrl.settings = {}
    ctrl.isAdmin = ACL.has('Provisioning')

    function onInit() {
      ctrl.loading = true
      loadCallCapacity()
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          ctrl.loading = false
        })
    }

    function displayMax(attr) {
      var value = ctrl.settings[attr]
      return value === -1 ? 'Unlimited' : value
    }

    function loadCallCapacity() {
      return ServiceProviderTrunkGroupCallCapacityService.show(
        ctrl.serviceProviderId
      ).then(function(data) {
        ctrl.settings = data
        return data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open(
        'editServiceProviderTrunkGroupsCallCapacity',
        function onSave(close) {
          update(ctrl.editSettings, close)
        }
      )
    }

    function update(settings, callback) {
      Alert.spinner.open()
      ServiceProviderTrunkGroupCallCapacityService.update(
        ctrl.serviceProviderId,
        settings
      )
        .then(loadCallCapacity)
        .then(function() {
          Alert.notify.success('Call Capacity Updated')
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
