;(function() {
  angular
    .module('odin.group')
    .component('outgoingCallingPlanDigitPlanRedirecting', {
      templateUrl:
        'group/components/meetMe/bridge/digitPlanRedirecting.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanDigitPlanRedirectingService,
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
      return UserOutgoingCallingPlanDigitPlanRedirectingService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanDigitPlanRedirectingService.update(
        ctrl.userId,
        plan
      )
        .then(function() {
          Alert.notify.success('Updated Redirecting Digit Plan')
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
        'editOutgoingCallingPlanDigitPlanRedirecting',
        function onSave(close) {
          update(ctrl.plan, close)
        }
      )
    }

    $scope.$on('outgoingCallingPlanDigitPlanRedirecting:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
