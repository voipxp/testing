;(function() {
  angular
    .module('odin.group')
    .component('outgoingCallingPlanDigitPlanCallMeNow', {
      templateUrl:
        'group/components/meetMe/bridge/digitPlanCallMeNow.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanDigitPlanCallMeNowService,
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
      return UserOutgoingCallingPlanDigitPlanCallMeNowService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanDigitPlanCallMeNowService.update(ctrl.userId, plan)
        .then(function() {
          Alert.notify.success('Updated Call Me Now Digit Plan')
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
        'editOutgoingCallingPlanDigitPlanCallMeNow',
        function onSave(close) {
          update(ctrl.plan, close)
        }
      )
    }

    $scope.$on('outgoingCallingPlanDigitPlanCallMeNow:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
