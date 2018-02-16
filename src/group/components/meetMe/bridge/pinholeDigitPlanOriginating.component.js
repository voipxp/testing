;(function() {
  angular
    .module('odin.group')
    .component('outgoingCallingPlanPinholeDigitPlanOriginating', {
      templateUrl:
        'group/components/meetMe/bridge/pinholeDigitPlanOriginating.component.html',
      controller: Controller
    })

  function Controller(
    Alert,
    UserOutgoingCallingPlanPinholeDigitPlanOriginatingService,
    $scope
  ) {
    var ctrl = this

    ctrl.edit = edit
    ctrl.options =
      UserOutgoingCallingPlanPinholeDigitPlanOriginatingService.options

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
      return UserOutgoingCallingPlanPinholeDigitPlanOriginatingService.show(
        ctrl.userId
      ).then(function(data) {
        ctrl.plan = data
        console.log('plan', data)
        console.log('userPermissions', ctrl.options.userPermissions)
        return data
      })
    }

    function update(plan, callback) {
      Alert.spinner.open()
      UserOutgoingCallingPlanPinholeDigitPlanOriginatingService.update(
        ctrl.userId,
        plan
      )
        .then(function() {
          Alert.notify.success('Updated Originating Pinhole Digit Plan')
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
        'editOutgoingCallingPlanPinholeDigitPlanOriginating',
        function onSave(close) {
          update(ctrl.plan, close)
        }
      )
    }

    $scope.$on('outgoingCallingPlanPinholeDigitPlanOriginating:load', function(
      event,
      data
    ) {
      ctrl.userId = data
      activate()
    })
  }
})()
