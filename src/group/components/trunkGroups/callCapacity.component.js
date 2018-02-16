;(function() {
  angular.module('odin.group').component('groupTrunkGroupsCallCapacity', {
    templateUrl: 'group/components/trunkGroups/callCapacity.component.html',
    controller: Controller,
    bindings: { serviceProviderId: '=', groupId: '=', module: '<' }
  })

  function Controller(
    Alert,
    GroupTrunkGroupCallCapacityService,
    $timeout,
    ACL
  ) {
    var ctrl = this
    ctrl.$onInit = activate
    ctrl.displayMax = displayMax
    ctrl.calcMax = calcMax
    ctrl.calcMin = calcMin
    ctrl.edit = edit
    ctrl.settings = {}
    ctrl.hasPermission = ACL.has

    function activate() {
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

    function calcMax(attr) {
      var value = ctrl.settings[attr]
      return value === -1 ? 99999 : value
    }

    function calcMin(attr) {
      var value = ctrl.settings[attr]
      return value === -1 ? -1 : 0
    }

    function loadCallCapacity() {
      return GroupTrunkGroupCallCapacityService.show(
        ctrl.serviceProviderId,
        ctrl.groupId
      ).then(function(data) {
        ctrl.settings = data
        console.log('callCapacity', data)
        return data
      })
    }

    function edit() {
      ctrl.editSettings = angular.copy(ctrl.settings)
      Alert.modal.open('editGroupTrunkGroupCallCapacity', function onSave(
        close
      ) {
        update(ctrl.editSettings, close)
      })
    }

    function update(settings, callback) {
      Alert.spinner.open()
      GroupTrunkGroupCallCapacityService.update(
        ctrl.serviceProviderId,
        ctrl.groupId,
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
