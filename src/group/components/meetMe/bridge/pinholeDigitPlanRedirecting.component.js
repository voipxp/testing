;(function() {
  angular
    .module('odin.group')
    .component('outgoingCallingPlanPinholeDigitPlanRedirecting', {
      templateUrl:
        'group/components/meetMe/bridge/pinholeDigitPlanRedirecting.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanPinholeDigitPlanRedirectingService,
    $scope
  ) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.options =
      UserOutgoingCallingPlanPinholeDigitPlanRedirectingService.options

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
      return UserOutgoingCallingPlanPinholeDigitPlanRedirectingService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanPinholeDigitPlanRedirectingService.update(
        ctrl.userId,
        plan
      )
        .then(function() {
          Alert.notify.success('Updated Redirecting Pinhole Digit Plan')
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
        'editOutgoingCallingPlanPinholeDigitPlanRedirecting',
        function onSave(close) {
          update(ctrl.plan, close)
        }
      )
    }

    $scope.$on('outgoingCallingPlanPinholeDigitPlanRedirecting:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
