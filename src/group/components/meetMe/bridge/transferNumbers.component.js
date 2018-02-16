;(function() {
  angular.module('odin.group').component('outgoingCallingPlanTransferNumbers', {
    templateUrl:
      'group/components/meetMe/bridge/transferNumbers.component.html',
    controller: Controller
  })

  function Controller(
    Alert,
    UserOutgoingCallingPlanTransferNumbersService,
    $scope
  ) {
    var ctrl = this

    ctrl.edit = edit

    function activate() {
      Alert.spinner.open()
      load()
        .then(function() {
          return edit()
        })
        .catch(function(error) {
          Alert.notify.danger(error)
        })
        .finally(function() {
          Alert.spinner.close()
        })
    }

    function load() {
      return UserOutgoingCallingPlanTransferNumbersService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      console.log('update', plan)
      UserOutgoingCallingPlanTransferNumbersService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Transfer Numbers Updated')
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

    function edit() {
      Alert.modal.open(
        'editOutgoingCallingPlanTransferNumbers',
        function onSave(close) {
          update(ctrl.plan, close)
        }
      )
    }

    $scope.$on('outgoingCallingPlanTransferNumbers:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
