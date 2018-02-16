;(function() {
  angular
    .module('odin.group')
    .component('outgoingCallingPlanPinholeDigitPlanCallMeNow', {
      templateUrl:
        'group/components/meetMe/bridge/pinholeDigitPlanCallMeNow.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService,
    $scope
  ) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.options =
      UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService.options

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
      return UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService.update(
        ctrl.userId,
        plan
      )
        .then(function() {
          Alert.notify.success('Updated Call Me Now Pinhole Digit Plan')
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
        'editOutgoingCallingPlanPinholeDigitPlanCallMeNow',
        function onSave(close) {
          update(ctrl.plan, close)
        }
      )
    }

    $scope.$on('outgoingCallingPlanPinholeDigitPlanCallMeNow:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
